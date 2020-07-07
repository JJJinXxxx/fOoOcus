function blockAll(){
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) { 
      // console.log(details)
      return {cancel: true}; 
    },
    {urls: 
      [
      "*://*.baidu.com/*"]
    },
    ["blocking"]
  );
 }
console.log("Reached background.js")

chrome.storage.sync.get(['blockSetting'],function(result){
    var order = result.blockSetting;
    console.log(order);
    if(order ==='blockAll'){
      blockAll();
    }
})