chrome.contextMenus.create({
    id: "generate-funnny-tweet",
    title: "Generate a Funny Tweet",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.action.setPopup({tabId: tab.id, popup: 'popup.html'});
    chrome.action.openPopup();
});