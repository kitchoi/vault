var $ = function(id) { return document.getElementById(id) };

window.onload = function() {
  var message  = $('message');
  // Get the current tab.
  chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      // Make sure we got the tab.
      if (tabs.length !== 1) {
        message.innerHTML = 'Unable to determine active tab.';
        return;
      }

      // Get the domain.
      var domain = null;
      var matches = tabs[0].url.match(/^http(?:s?):\/\/([^/]*)/);
      if (matches) {
        domain = matches[1].toLowerCase();
      } else {
        // Example cause: files served over the file:// protocol.
        message.innerHTML = 'Unable to determine the domain.';
        return;
      }
      if (/^http(?:s?):\/\/chrome\.google\.com\/webstore.*/.test(tabs[0].url)) {
        // Technical reason: Chrome prevents content scripts from running in the app gallery.
        message.innerHTML = 'Cannot get domain in the Chrome Web Store.';
        return;
      }
      $('service').value = domain;

      // Focus the text field.
      $('passphrase').focus();
    }
  );
};
