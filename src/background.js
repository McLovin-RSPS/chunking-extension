// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'splitText') {
    // Forward the message to the active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, request, (response) => {
        sendResponse(response);
      });
    });
    // Indicate that the response will be sent asynchronously
    return true;
  }
});
