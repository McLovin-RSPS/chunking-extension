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
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {  
      chrome.tabs.executeScript(
        tab.id,
        { file: "inject.js" },
        () => {      
          const chunks = splitTextIntoChunks(text, chunkSize);             
          sendChunksToChatGPT(chunks);
        }
      );   
    });     
  }    
});

function sendChunksToChatGPT(chunks) {
  // ... (existing code)
}
