// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'splitText') {
    const { text, chunkSize } = request;
    const chunks = splitTextIntoChunks(text, chunkSize);
    switchToChatGPT();
    sendChunksToChatGPT(chunks);
    sendResponse({ chunks });
  }
});

function splitTextIntoChunks(text, chunkSize) {
  // Implement your text chunking logic here
  // Split the text into chunks of the desired size
  // Return an array of chunks
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

function switchToChatGPT() {
  // Implement the logic to switch to the ChatGPT window
  // This could involve finding the ChatGPT tab or opening a new tab/window
  // Example: Use chrome.tabs API to find or create a ChatGPT tab
  chrome.tabs.query({ title: 'ChatGPT' }, (tabs) => {
    if (tabs.length > 0) {
      // ChatGPT tab found, switch to it
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      // ChatGPT tab not found, create a new tab
      chrome.tabs.create({ url: 'https://chat.openai.com/' });
    }
  });
}

function sendChunksToChatGPT(chunks) {
  // Implement the logic to send each chunk to ChatGPT
  // You can use the ChatGPT API or simulate user input to paste the chunks
  // Example: Use chrome.tabs.sendMessage to send each chunk to the ChatGPT tab
  chrome.tabs.query({ title: 'ChatGPT' }, (tabs) => {
    if (tabs.length > 0) {
      // ChatGPT tab found, send each chunk to it
      const chatGPTTab = tabs[0];
      chunks.forEach((chunk) => {
        chrome.tabs.sendMessage(chatGPTTab.id, { action: 'sendChunk', chunk });
      });
    } else {
      // ChatGPT tab not found, handle the error or fallback
      console.error('ChatGPT tab not found');
    }
  });
}