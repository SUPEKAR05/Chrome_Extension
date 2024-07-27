(function() {
    console.log('YouTube Timestamp Bookmark extension content script loaded');
  
    // Button style
    const buttonStyle = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      background-color: #444;
      color: #fff;
      border: none;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      z-index: 1000;
    `;
  
    // Create and style the button
    const timestampButton = document.createElement('button');
    timestampButton.innerText = 'Bookmark Timestamp';
    timestampButton.style.cssText = buttonStyle;
  
    // Add click event listener
    timestampButton.addEventListener('click', () => {
      console.log('Timestamp button clicked');
      const video = document.querySelector('video');
      if (video) {
        const currentTime = video.currentTime;
        console.log(`Current video time: ${currentTime}`);
        chrome.storage.sync.get('timestamps', (data) => {
          const timestamps = data.timestamps || [];
          timestamps.push(currentTime);
          chrome.storage.sync.set({ timestamps }, () => {
            console.log(`Timestamp ${currentTime} saved!`);
            alert(`Timestamp ${currentTime.toFixed(2)} seconds saved!`);
          });
        });
      } else {
        console.error('Video element not found');
      }
    });
  
    // Append button to the body
    document.body.appendChild(timestampButton);
  })();
  