'use strict';

const { explainAnswer } = require('./_ai');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { question, options, correctAnswer, userAnswer } = req.body || {};
  if (!question || !options || !correctAnswer || !userAnswer) {
    return res.status(400).json({ success: false, error: 'Missing fields: question, options, correctAnswer, userAnswer' });
  }
  if (!Array.isArray(options) || options.length !== 4) {
    return res.status(400).json({ success: false, error: 'options must be array of 4' });
  }

  try {
    const explanation = await explainAnswer(question, options, correctAnswer, userAnswer);
    return res.status(200).json({ success: true, explanation });
  } catch (err) {
    console.error('explain error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};
