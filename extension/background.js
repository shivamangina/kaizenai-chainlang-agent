chrome.runtime.onInstalled.addListener(() => {
    console.log("Kaisen.ai Extension Installed");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['script.js']
    });
  });
  

  chrome.runtime.onInstalled.addListener(() => {
    console.log("Kaisen.ai Extension Installed");
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replacePlayer" && request.videoUrl) {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        func: (videoUrl) => {
          const videoPlayer = document.getElementById('movie_player');
          if (videoPlayer) {
            videoPlayer.remove();
            
            const newPlayer = document.createElement('video');
            newPlayer.src = videoUrl;
            newPlayer.controls = true;
            newPlayer.autoplay = true;
            newPlayer.style.width = '100%';
            newPlayer.style.height = '100%';
            
            const playerContainer = document.getElementById('player');
            if (playerContainer) {
              playerContainer.appendChild(newPlayer);
            }
          } else {
            console.error('YouTube video player not found');
          }
        },
        args: [request.videoUrl]
      });
    }
  });
  