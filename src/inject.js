const textarea = document.querySelector(".tox-textareay");  
// Get text content from active tab 
const text = textarea.value;  
chrome.runtime.sendMessage({text}, response => {});

