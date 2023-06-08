chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "splitText") {
    chrome.tabs.create({url: "https://chat.openai.com/"}, tab => {
      setTimeout(() => {
        chrome.tabs.executeScript(tab.id, {file: "src/inject.js"});
        chrome.tabs.insertCSS(tab.id, {file: "src/styles.css"});
      }, 2000);
    });
  }
});
