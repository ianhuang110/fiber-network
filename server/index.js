const express = require('express');
const cors = require('cors');
const Fuse = require('fuse.js');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load dummy database
const dbPath = path.join(__dirname, 'database.json');
let communities = [];
try {
  const data = fs.readFileSync(dbPath, 'utf8');
  communities = JSON.parse(data);
} catch (error) {
  console.error('Error loading database.json:', error);
}

// Setup Fuzzy Search (Fuse.js)
const fuseOptions = {
  keys: ['name'],
  includeScore: true,
  threshold: 0.4, // Lower is more strict. 0.0 requires perfect match
};
const fuse = new Fuse(communities, fuseOptions);

// Mock External API/Scraping Logic
async function checkExternalCoverage(query) {
  // Simulate network delay of scraping external site
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate an external API checking logic
      // e.g. If the query contains "大樓" or query length > 4, we pretend it's covered
      if (query.includes('中華') || query.includes('光世代') || query.length >= 4) {
        resolve({
          source: 'external_scraper',
          hasCoverage: true,
          message: '📡 外部線路系統查詢：該區域具備光纖基礎擴建條件，可預約勘查。'
        });
      } else {
        resolve({
          source: 'external_scraper',
          hasCoverage: false,
          message: '⚠️ 外部線路系統查詢：該地址目前無光纖基礎建設，暫無法供裝。'
        });
      }
    }, 1500); // 1.5s delay to mock web scraping
  });
}

// 供裝查詢 Endpoint
app.get('/api/coverage', async (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const queryStr = q.trim();

  try {
    // Validate if query only contains Chinese characters (and optional spaces)
    const isOnlyChinese = /^[\u4E00-\u9FA5]+$/.test(queryStr);

    if (isOnlyChinese) {
      return res.json({
        status: 'success',
        source: 'chinese_validation',
        data: { name: queryStr, speed: '300M光纖' },
        message: `您查詢的「${queryStr}」已在專屬供裝名單內！`
      });
    }

    // Reject non-chinese characters
    return res.json({
      status: 'success',
      source: 'chinese_validation',
      hasCoverage: false,
      error: true,
      message: '⚠️ 抱歉，社區名稱格式錯誤，請確保「只輸入中文字」。'
    });

  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Internal server error while searching' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
});
