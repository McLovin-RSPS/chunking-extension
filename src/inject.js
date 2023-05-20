const textarea = document.querySelector(".tox-textareay");
// Paste chunks and send keypress 
chrome.runtime.sendMessage({chunks: chunks}, response => {});