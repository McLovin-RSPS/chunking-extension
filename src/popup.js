// popup.js
document.getElementById('chunkForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const text = document.getElementById('textInput').value;
  const chunkSize = document.getElementById('chunkSlider').value;
  chrome.tabs.query({ url: 'https://chatgpt.com/*' }, (tabs) => {
    if (tabs.length > 0) {
      const chatGPTTab = tabs[0];
      chrome.tabs.sendMessage(chatGPTTab.id, { action: 'splitText', text, chunkSize }, (response) => {
        // Handle the response from content.js (array of chunks)
        // You can display the chunks or perform any further actions here
      });
    } else {
      // Open a new tab if ChatGPT tab is not found
      chrome.tabs.create({ url: 'https://chatgpt.com' }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tab.id, { action: 'splitText', text, chunkSize }, (response) => {
              // Handle the response from content.js (array of chunks)
              // You can display the chunks or perform any further actions here
            });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  });
});
