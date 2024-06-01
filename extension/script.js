
document.getElementById("tryNowButton").addEventListener("click", async function() {
    try {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        const currentUrl = activeTab.url;
        console.log("Current URL:", currentUrl);
  
        // Call the API with the current URL
        fetchData(currentUrl, activeTab.id);
      });
    } catch (error) {
      console.error("Error capturing URL or calling API:", error);
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("tryNowButton").addEventListener("click", async function() {
      try {
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const activeTab = tabs[0];
          const currentUrl = activeTab.url;
          console.log("Current URL:", currentUrl);
  
          // Call the API with the current URL
          fetchData(currentUrl, activeTab.id);
        });
      } catch (error) {
        console.error("Error capturing URL or calling API:", error);
      }
    });
  });

async function fetchData(_url, tabId) {
    try {
    //   const url =
    //     "https://google-translate1.p.rapidapi.com/language/translate/v2/languages";
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       "Accept-Encoding": "application/gzip",
    //       "X-RapidAPI-Key": "X_API_KEY",
    //       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    //     },
    //   };
  
    //   const response = await fetch(url, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const record = await response.json();
    //   console.log(record, "record");

      // Assuming the response contains a videoUrl property with the video URL
      const videoUrl = "https://synchlabs-public.s3.us-west-2.amazonaws.com/david_demo_shortvid-03a10044-7741-4cfc-816a-5bccd392d1ee.mp4";

      // Send a message to the background script to replace the YouTube player
      chrome.runtime.sendMessage({
        action: 'replacePlayer',
        videoUrl: videoUrl,
        tabId: tabId
      });

      document.getElementById("date").innerHTML = _url;
      document.getElementById("areaName").innerHTML= 'INDIA'
    //   document.getElementById("areaName").innerHTML=record.data.languages[0].language;
      // document.getElementById("latestBy").innerHTML=record.data[0].latestBy;
      // document.getElementById("deathNew").innerHTML=record.data[0].deathNew;
    } catch (error) {
      console.error(error, "error");
    }
  }
//   fetchData();
  