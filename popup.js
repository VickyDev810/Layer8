document.addEventListener('DOMContentLoaded', function() {
  const enableToggle = document.getElementById('enableToggle');
  const statusText = document.getElementById('statusText');
  
  // Load current state from storage
  chrome.storage.sync.get('enabled', function(data) {
    // Default to enabled if not set
    const isEnabled = data.enabled !== undefined ? data.enabled : true;
    enableToggle.checked = isEnabled;
    updateStatusText(isEnabled);
  });
  
  // Add toggle event listener
  enableToggle.addEventListener('change', function() {
    const isEnabled = enableToggle.checked;
    
    // Save to storage
    chrome.storage.sync.set({enabled: isEnabled}, function() {
      updateStatusText(isEnabled);
      console.log(`Extension ${isEnabled ? 'enabled' : 'disabled'}`);
    });
  });
  
  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled ? 'Enabled' : 'Disabled';
    statusText.style.color = isEnabled ? '#10a37f' : '#d9534f';
  }
});