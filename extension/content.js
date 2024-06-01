function replaceYouTubePlayer(videoUrl) {
    const videoPlayer = document.getElementById('movie_player');
    if (videoPlayer) {
      videoPlayer.remove();
  
      const newPlayer = document.createElement('video');
      newPlayer.src = videoUrl;
      newPlayer.controls = true;
      newPlayer.autoplay = true;
      newPlayer.style.width = '70%';
      newPlayer.style.height = '50%';
      newPlayer.style.backgroundColor = 'black'; // Ensure there's a background color
  
      const playerContainer = document.getElementById('player');
      if (playerContainer) {
        playerContainer.innerHTML = ''; // Clear any existing content
        playerContainer.appendChild(newPlayer);
      }
    } else {
      console.error('YouTube video player not found');
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'replacePlayer' && request.videoUrl) {
      replaceYouTubePlayer(request.videoUrl);
    }
  });
  