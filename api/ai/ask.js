'use strict';

const { askQuestion } = require('./_ai');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ success: false, error: 'Missing question' });
  }
  if (question.length > 500) {
    return res.status(400).json({ success: false, error: 'Question too long' });
  }

  try {
    const answer = await askQuestion(question.trim());
    return res.status(200).json({ success: true, answer });
  } catch (err) {
    console.error('ask error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};
