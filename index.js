const path = require('node:path');
const { initializeClient, indexURLs } = require('./indexingLib');

// Path to your service account key file
const KEYFILEPATH = path.join(__dirname, 'key.json');

// List of URLs to index
const urlsToIndex = [ 'https://www.example.com/page1', 'https://www.example.com/page2' ];

(async () => {
  try {
    await initializeClient(KEYFILEPATH);
    await indexURLs(urlsToIndex);
  } catch (error) {
    console.error('Error initializing client or indexing URLs:', error);
  }
})();