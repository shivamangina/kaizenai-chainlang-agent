chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Mayhem Extension Installed");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['script.js']
    });
  });
  