'use strict';

const { CONCRETE_KNOWLEDGE } = require('./_knowledge');

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

// ── Generic caller ─────────────────────────────────────────
async function callOpenAI(system, user, maxTokens, jsonMode) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const body = {
    model: MODEL,
    max_tokens: maxTokens || 4000,
    temperature: 0.3,
    messages: [
      { role: 'system', content: system },
      { role: 'user',   content: user   },
    ],
  };

  // JSON mode guarantees valid JSON output — eliminates parse failures
  if (jsonMode) body.response_format = { type: 'json_object' };

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ── System prompt ──────────────────────────────────────────
function systemPrompt() {
  return `You are an AI assistant for Concrete.xyz. Answer ONLY using the documentation below.
If not found, respond: "Not found in project documentation". Do not hallucinate.

=== DOCS ===
${CONCRETE_KNOWLEDGE}
=== END ===`;
}

// ── Normalization ──────────────────────────────────────────
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
    out.push({
      question: q.question.trim(),
      options: opts,
      correctAnswer: letter,
      explanation: q.explanation.trim(),
    });
  }
  return out;
}

// ── Question generation ────────────────────────────────────
async function generateQuestions() {
  const sys = systemPrompt() + `

IMPORTANT: You must respond with valid JSON only. Your entire response must be a JSON object with a single key "questions" containing an array of exactly 15 items.`;

  const usr = `Generate exactly 15 multiple-choice quiz questions about Concrete.xyz using ONLY the documentation.

Respond with this exact JSON shape:
{"questions":[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correctAnswer":"A","explanation":"..."},...]}

Rules:
- Exactly 15 items in the "questions" array
- "correctAnswer" is ONE letter only: "A", "B", "C", or "D"
- 4 options each, prefixed "A. " "B. " "C. " "D. "
- Keep explanations to 1-2 sentences
- Topics: ERC-4626, vault mechanics, fees, Earn V1 vs V2, roles, async withdrawals, accounting, risks, rewards`;

  for (let i = 1; i <= 2; i++) {
    try {
      // jsonMode=true forces OpenAI to return valid JSON — no parse errors
      const raw = await callOpenAI(sys, usr, 6000, true);
      const parsed = JSON.parse(raw);
      // Handle both {questions:[...]} and bare [...] 
      const arr = Array.isArray(parsed) ? parsed : parsed.questions;
      const questions = normalizeQuestions(arr);
      if (questions) {
        console.log(`✅ Questions generated on attempt ${i}`);
        return questions;
      }
      console.warn(`Attempt ${i}: normalization failed, array length=${arr && arr.length}`);
    } catch(e) {
      console.error(`Attempt ${i} error:`, e.message);
      if (i === 2) throw e;
    }
  }
  throw new Error('Could not generate valid questions');
}

// ── Explain answer ─────────────────────────────────────────
async function explainAnswer(question, options, correctAnswer, userAnswer) {
  const usr = `Quiz question: ${question}
Options: ${options.join(' | ')}
Correct: ${correctAnswer} | User answered: ${userAnswer}
In 2 sentences, explain why ${correctAnswer} is correct. If user was wrong, note it kindly. Use ONLY the docs.`;
  return callOpenAI(systemPrompt(), usr, 400);
}

// ── Ask AI ─────────────────────────────────────────────────
async function askQuestion(question) {
  const usr = `${question}
Answer using ONLY the Concrete.xyz documentation. Be concise. If not found say "Not found in project documentation".`;
  return callOpenAI(systemPrompt(), usr, 600);
}

module.exports = { generateQuestions, explainAnswer, askQuestion };
