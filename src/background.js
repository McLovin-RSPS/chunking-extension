chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.create({url: "https://chat.openai.com/"}); 
});
