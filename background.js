chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'jump') {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        function: (timestamp) => {
          const video = document.querySelector('video');
          if (video) {
            video.currentTime = timestamp;
          }
        },
        args: [request.timestamp]
      });
    }
  });
  