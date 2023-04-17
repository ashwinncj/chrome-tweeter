
document.addEventListener("DOMContentLoaded", () => {
        chrome.storage.sync.get("api_key", ({ api_key }) => {
        document.getElementById("openai-api-key").value = api_key || '';
    });
});

document.getElementById("save-api-key-button").addEventListener("click", () => {    
    // Get the API key from the options page
    const apiKey = document.getElementById("openai-api-key").value;

    // Store the API key in Chrome storage
    chrome.storage.sync.set({ "api_key": apiKey }, () => {
        console.log("API key stored in Chrome storage");
    });
});