chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({"vpntoggle":false},function () {
        console.log("set storage");
    })
   

})
