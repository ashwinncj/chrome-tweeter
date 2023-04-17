chrome.contextMenus.create({
    id: "generate-funnny-tweet",
    title: "Generate a Funny Tweet for \"%s\"",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "generate-funnny-tweet") {
        chrome.action.setPopup({tabId: tab.id, popup: 'popup.html'});
        chrome.action.openPopup();
    }
});