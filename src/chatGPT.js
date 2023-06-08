function sendChunksToChatGPT(chunks) {
  chrome.tabs.query({ url: 'https://chat.openai.com/*' }, (tabs) => {
    const chatGPTTab = tabs[0];
    chunks.forEach((chunk, index) => {
      const message = `Text #${index + 1}/${chunks.length}: ${chunk}`;
      chrome.tabs.sendMessage(chatGPTTab.id, { action: 'sendPrompt', message });
    });
  });
}

