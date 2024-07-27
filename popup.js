document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('timestamps', (data) => {
      const timestamps = data.timestamps || [];
      const ul = document.getElementById('timestamps');
      timestamps.forEach((timestamp) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `javascript:void(0);`;
        link.innerText = `${timestamp.toFixed(2)} seconds`;
        link.addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'jump', timestamp });
          });
        });
        li.appendChild(link);
        ul.appendChild(li);
      });
    });
  });
  