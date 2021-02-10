var button = document.getElementById("toggle")
var message = document.getElementById("message")
var toggled = null;
 
const offconfig = {
    mode : "direct"
}
const onconfig = {
    mode : "fixedservers",
    rules : {
        singleProxy:{
            host : "51.75.147.41",
            port : 3128,
            scheme : "https",
        },
        bypassList : []        
    }
}
var update = ()=>{
    if (toggled) {
        message.innerHTML = "Twilight Shield is currently on and is doing everything it can to protect your traffic. Goodnight, spyware!"
        button.innerHTML = "Turn off Twilight Shield"
        console.log(chrome.proxy.settings);
        chrome.proxy.settings.set(
            {
                value:onconfig,
                scope:"regular"
            },
            ()=> {
                console.log("proxy on")
            }
        )
    }
    else {
        message.innerHTML = "Twilight shield is currently off and spyware may have an easier time spying on you."
        button.innerHTML = "Turn on Twilight Shield "
        chrome.proxy.settings.set(
            {
                value:offconfig,
                scope:"regular"
            },
             () => {
                console.log("proxy off")
            }
        )
    }

}
chrome.storage.local.get("vpntoggle",  (data)=> {
    toggled = data.vpntoggle;
    update();
})
button.addEventListener("click",  ()=> {
    chrome.storage.local.set({"vpntoggle":!toggled}, ()=> {
        console.log("set storage");
        chrome.storage.local.get("vpntoggle",(data)=> {
            toggled = data.vpntoggle;
            update();
        })
    })
})