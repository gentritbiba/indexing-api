const { google } = require('googleapis');
const path = require('path');

// Path to your service account key file
const KEYFILEPATH = path.join(__dirname, 'key.json');
console.log(KEYFILEPATH);

// Specify the site to index
const SITE_URL = 'https://www.rightpriceautostn.com/';

// Configure the client
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

// Create a client instance
const client = auth.fromJSON(require(KEYFILEPATH));
client.scopes = ['https://www.googleapis.com/auth/indexing'];
const indexing = google.indexing({
  version: 'v3',
  auth: client,
});

// Function to index a URL
async function indexURL(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log('URL indexed:', url);
    console.log(res.data);
  } catch (error) {
    console.error('Error indexing URL:', url, error);
  }
}

// List of URLs to index
const urlsToIndex = [
  "https://www.audifallriver.com/audi-q7-specials-fall-river-ma-dtw.htm ",
  "https://www.audifallriver.com/audi-q3-specials-fall-river-ma-dtw.htm",
  "https://www.audifallriver.com/audi-a5-specials-fall-river-ma-dtw.htm",
  // Add more URLs as needed
];

// Index each URL
urlsToIndex.forEach(url => indexURL(url));
