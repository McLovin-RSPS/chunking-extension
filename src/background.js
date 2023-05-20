chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "splitText") {
    chrome.tabs.query({url: "https://chat.openai.com/*"}, tabs => {  
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
});