'use strict';

const { CONCRETE_KNOWLEDGE } = require('./_knowledge');

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

async function callOpenAI(system, user, maxTokens) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set in environment variables');

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens || 8000,
      temperature: 0.3,
      messages: [
        { role: 'system', content: system },
        { role: 'user',   content: user   },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

function systemPrompt() {
  return `You are an AI assistant for Concrete.xyz. Answer ONLY using the documentation below.
If not found, respond: "Not found in project documentation". Do not hallucinate.

=== DOCS ===
${CONCRETE_KNOWLEDGE}
=== END ===`;
}

function normalizeAnswer(val) {
  if (!val) return null;
  const t = String(val).trim();
  if (/^[A-D]$/.test(t)) return t;
  const m = t.match(/^([A-D])[^a-zA-Z]/);
  if (m) return m[1];
  if (/^[A-D]/.test(t)) return t[0];
  return null;
}

function normalizeQuestions(arr) {
  if (!Array.isArray(arr) || arr.length !== 15) return null;
  const letters = ['A','B','C','D'];
  const out = [];
  for (const q of arr) {
    if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.explanation) return null;
    const letter = normalizeAnswer(q.correctAnswer);
    if (!letter) return null;
    const opts = q.options.map((o, i) => {
      const s = String(o).trim();
      return /^[A-D][.)]\s/.test(s) ? s : `${letters[i]}. ${s.replace(/^[A-D][.)]\s*/, '')}`;
    });
    out.push({ question: q.question.trim(), options: opts, correctAnswer: letter, explanation: q.explanation.trim() });
  }
  return out;
}

async function generateQuestions() {
  const sys = systemPrompt();
  const usr = `Generate exactly 15 multiple-choice quiz questions about Concrete.xyz using ONLY the documentation.

Return ONLY a raw JSON array. No markdown, no code fences, no text before or after.

Format:
[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correctAnswer":"A","explanation":"..."}]

Rules:
- Exactly 15 items
- "correctAnswer" must be exactly one of: "A" "B" "C" "D" — single letter only
- 4 options each, prefixed A. B. C. D.
- Topics: ERC-4626, vault mechanics, fees (1.5% AUM), Earn V1 vs V2, roles, async withdrawals, accounting, risks, rewards
- Output ONLY the JSON array starting with [ and ending with ]`;

  for (let i = 1; i <= 3; i++) {
    try {
      const raw = await callOpenAI(sys, usr, 8000);
      const cleaned = raw.trim().replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/\s*```$/,'').trim();
      const parsed = JSON.parse(cleaned);
      const questions = normalizeQuestions(parsed);
      if (questions) return questions;
      console.warn(`Attempt ${i}: normalization failed`);
    } catch(e) {
      console.error(`Attempt ${i} error:`, e.message);
      if (i === 3) throw e;
    }
  }
  throw new Error('Could not generate valid questions after 3 attempts');
}

async function explainAnswer(question, options, correctAnswer, userAnswer) {
  const usr = `Quiz question about Concrete.xyz:
Question: ${question}
Options: ${options.join(' | ')}
Correct: ${correctAnswer}
User answered: ${userAnswer}
In 2-3 sentences explain why ${correctAnswer} is correct. If wrong, note it kindly. Use ONLY the docs.`;
  return callOpenAI(systemPrompt(), usr, 600);
}

async function askQuestion(question) {
  const usr = `User question: ${question}
Answer using ONLY the Concrete.xyz documentation. Be concise. If not found say "Not found in project documentation".`;
  return callOpenAI(systemPrompt(), usr, 800);
}

module.exports = { generateQuestions, explainAnswer, askQuestion };
