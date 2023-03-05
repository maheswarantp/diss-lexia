// Listen for the user to click on the extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the content script to run text-to-speech on the selected text
    chrome.tabs.sendMessage(tab.id, { action: "speak" });
});