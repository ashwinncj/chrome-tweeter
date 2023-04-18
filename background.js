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
        var suggestion = getTweetSuggestions(selection, api_key);
        chrome.storage.local.set({ tweets: suggestion });
        chrome.action.setPopup({tabId: tab.id, popup: 'popup.html'});
        chrome.action.openPopup();
    });
}

function getTweetSuggestions(selection, api_key){
    const url = 'https://api.openai.com/v1/completions';
    const prompt = 'Write a funny tweet for the following text:\n' + selection +'\n\nTweet:';

    const data = {
        "model": "gpt-3.5-turbo",
        "prompt": prompt,
        "max_tokens": 50,
        "n": 1,
        "stream": false,
        "logprobs": null,
        "stop": "\n"
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
        // const tweet = data.choices[0].text.trim();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
}