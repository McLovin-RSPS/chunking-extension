function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];  
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(chunk); 
  }    
  return chunks;
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action === "splitText") {
    const { text, chunkSize } = request;    
    const chunks = splitTextIntoChunks(text, chunkSize);   
    sendChunksToChatGPT(chunks);
  }    
});

function sendChunksToChatGPT(chunks) {
  chrome.tabs.query({ url: 'https://chat.openai.com/*' }, (tabs) => {
    const chatGPTTab = tabs[0];
    chunks.forEach((chunk, index) => {
      const message = `Text #${index + 1}/${chunks.length}: ${chunk}`;
      chrome.tabs.sendMessage(chatGPTTab.id, { action: 'sendPrompt', message });
    });
  });
}

