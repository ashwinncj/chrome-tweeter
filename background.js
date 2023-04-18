chrome.contextMenus.create({
    id: "generate-funnny-tweet",
    title: "Generate a Funny Tweet for \"%s\"",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "generate-funnny-tweet") {
        generateAndUpdate(tab,info.selectionText);
    }
});

function generateAndUpdate(tab,selection){

    chrome.storage.sync.get('api_key', function(data) {
        const api_key = data.api_key;
        getTweetSuggestions(selection, api_key, tab);
    });
}

function getTweetSuggestions(selection, api_key, tab){
    const url = 'https://api.openai.com/v1/chat/completions';
    const prompt = 'Write a very funny tweet with 100 characters for this -:\n' + selection;

    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role":"user", "content": prompt}
        ],
        "max_tokens": 50
      };
  
    var headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + api_key
    };
  
    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const tweet = data.choices[0].message.content;
        showTweetSuggestion(tweet, tab);
      })
      .catch((error) => {
        console.error(error);
      });
}

function showTweetSuggestion(tweet, tab) {
    chrome.storage.local.set({ tweets: tweet });
    chrome.action.setPopup({tabId: tab.id, popup: 'popup.html'});
    chrome.action.openPopup();
}