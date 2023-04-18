chrome.storage.local.get('tweets', function(data) {
    document.getElementById("output-message").innerHTML = data.tweets;
    console.log(data.tweets);
});