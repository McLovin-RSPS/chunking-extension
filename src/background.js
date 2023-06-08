chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.create({url: "https://chat.openai.com/"}, tab => {
    // Wait for ChatGPT to load before injecting content script
    setTimeout(() => {
      chrome.tabs.executeScript(tab.id, {file: "src/inject.js"});
      chrome.tabs.insertCSS(tab.id, {file: "src/styles.css"});
    }, 2000);
  });
}); 



