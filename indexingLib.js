const { google } = require('googleapis');
const path = require('node:path');

let indexingClient;

/**
 * Initializes the Google Indexing API client.
 * @param {string} keyFilePath - Path to the service account key file.
 */
async function initializeClient(keyFilePath) {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const client = await auth.getClient();
  indexingClient = google.indexing({
    version: 'v3',
    auth: client,
  });
}

/**
 * Indexes a URL using the Google Indexing API.
 * @param {string} url - The URL to index.
 */
async function indexURL(url) {
  if (!indexingClient) {
    throw new Error('Indexing client is not initialized. Call initializeClient() first.');
  }

  try {
    const res = await indexingClient.urlNotifications.publish({
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

/**
 * Indexes a list of URLs.
 * @param {string[]} urls - The list of URLs to index.
 */
async function indexURLs(urls) {
  for (const url of urls) {
    await indexURL(url);
  }
}

module.exports = {
  initializeClient,
  indexURL,
  indexURLs,
};