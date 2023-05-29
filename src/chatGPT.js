// chatGPT.js
function switchToChatGPT() {
  chrome.tabs.query({ url: 'https://chat.openai.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      const chatGPTTab = tabs[0];
      chrome.tabs.update(chatGPTTab.id, { active: true });
    } else {
      chrome.tabs.create({ url: 'https://chat.openai.com' });
    }
  });
}

function sendChunksToChatGPT(chunks) {
  chrome.tabs.query({ url: 'https://chat.openai.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      const chatGPTTab = tabs[0];
      chunks.forEach((chunk, index) => {
        const message = `Text #${index + 1}/${chunks.length}: ${chunk}`;
        chrome.tabs.sendMessage(chatGPTTab.id, { action: 'sendPrompt', message });
      });
    }
  });
}

// Listen for messages from content.js or other components if needed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle any additional messages here if required
});
