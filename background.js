console.log('worker is fine')
chrome.tabs.onUpdated.addListenter((tabId, tab) => {
    if(tab.url){
        console.log(tab.url)
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            website: tab.url
        })
    }
})