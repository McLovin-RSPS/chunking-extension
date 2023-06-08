const textarea = document.querySelector(".tox-textareay");
// Get text content from active tab 
const text = textarea.value;
// Paste chunks and send keypress 
chrome.runtime.sendMessage({chunks: chunks, text, chunkSize}, response => {});