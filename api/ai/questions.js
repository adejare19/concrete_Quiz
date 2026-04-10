'use strict';

const { generateQuestions } = require('./_ai');

let cache = null;
let cacheTime = 0;
const TTL = 30 * 60 * 1000;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const now = Date.now();
    if (cache && now - cacheTime < TTL && req.query.refresh !== 'true') {
      return res.status(200).json({ success: true, questions: cache, cached: true });
    }

    const questions = await generateQuestions();
    cache = questions;
    cacheTime = now;
    return res.status(200).json({ success: true, questions, cached: false });
  } catch (err) {
    console.error('questions error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};
