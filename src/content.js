chrome.runtime.sendMessage({
  action: "splitText", 
  text: document.querySelector("#textInput").value,
  chunkSize: document.querySelector("#chunkSlider").value
});


