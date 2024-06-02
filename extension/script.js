// document.getElementById("tryNowButton").addEventListener("click", async function() {
//     try {
//       // Get the active tab
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         const activeTab = tabs[0];
//         const currentUrl = activeTab.url;
//         console.log("Current URL:", currentUrl);

//         // Call the API with the current URL
//         fetchData(currentUrl, activeTab.id);
//       });
//     } catch (error) {
//       console.error("Error capturing URL or calling API:", error);
//     }
//   });

// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("tryNowButton").addEventListener("click", async function() {
//     try {
//       // Get the active tab
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         const activeTab = tabs[0];
//         const currentUrl = activeTab.url;
//         console.log("Current URL:", currentUrl);

//         // Call the API with the current URL
//         fetchData(currentUrl, activeTab.id);
//       });
//     } catch (error) {
//       console.error("Error capturing URL or calling API:", error);
//     }
//   });
// });

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
    const videoUrl =
      "https://synchlabs-public.s3.us-west-2.amazonaws.com/david_demo_shortvid-03a10044-7741-4cfc-816a-5bccd392d1ee.mp4";

    // Send a message to the background script to replace the YouTube player
    chrome.runtime.sendMessage({
      action: "replacePlayer",
      videoUrl: videoUrl,
      tabId: tabId,
    });

    document.getElementById("date").innerHTML = _url;
    document.getElementById("areaName").innerHTML = "INDIA";
    //   document.getElementById("areaName").innerHTML=record.data.languages[0].language;
    // document.getElementById("latestBy").innerHTML=record.data[0].latestBy;
    // document.getElementById("deathNew").innerHTML=record.data[0].deathNew;
  } catch (error) {
    console.error(error, "error");
  }
}
//   fetchData();
document.addEventListener("DOMContentLoaded", function () {
  const chatHistoryElement = document.getElementById("chatHistory");
  const messageInputElement = document.getElementById("messageInput");
  const sendMessageButton = document.getElementById("sendMessageButton");

  // Function to add a message to the chat history
  function addMessageToChatHistory(message, isAi = false) {
    const messageElement = document.createElement("div");
    messageElement.className = "col-start-1 col-end-8 rounded-lg p-3";
    messageElement.innerHTML = `
      <div class="flex ${!isAi ? "flex-row-reverse" : "flex-row"}">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
          !isAi ? "bg-pink-200" : "bg-red-300"
        }">${isAi ? "A" : "U"}</div>
        <div class="relative ${
          isAi ? "ml-3" : "mr-3"
        } text-sm bg-white py-2 px-4 shadow rounded-xl">${message}</div>
      </div>
    `;

    chatHistoryElement.appendChild(messageElement);
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
  }

  // Event listener for sending messages
  sendMessageButton.addEventListener("click", sendMessage);

  messageInputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = messageInputElement.value.trim();
    if (message !== "") {
      // Add user's message to chat history
      addMessageToChatHistory(message, false);
      // Clear input field
      messageInputElement.value = "";

      // Get the current tab URL
      chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const activeTab = tabs[0];
        const currentUrl = activeTab.url;

        console.log("Current URL:", currentUrl);
        const _url = `http://127.0.0.1:8000/summarize?url=${encodeURIComponent(currentUrl)}&question=${encodeURIComponent(message)}`;

        try {
          const response = await fetch(_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({ url: currentUrl, question: message }),
          });

          if (response.ok) {
            const data = await response.json();
            // Add AI's response to chat history
            addMessageToChatHistory(data, true);
          } else {
            console.error("Failed to send message:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  }
});
