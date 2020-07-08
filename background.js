var blockAll = document.getElementById("blockAll");
var blockPart = document.getElementById("blockPart");

var blackList = ["https://facebook.com/","https://www.reddit.com/","https://www.youtube.com/"];

function deleteFromBlackList(url,arr){
  var index = arr.indexOf(url);
  if(index > -1){
    arr.splice(index,1);
  }
}

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
var site = document.getElementById("site");
var addURL = document.getElementById("addURL");
var removeURL = document.getElementById("removeURL");

if(addURL){
  addURL.addEventListener('click',function(){
    var tempURL = site.value;
    site.value="";
    if(isURL(tempURL)){
      blackList.push(tempURL);
      console.log(blackList);
      alert("Add successfully");
    }else{
      alert("URL is not valid");
    }
  })
}

if(removeURL){
  removeURL.addEventListener('click',function(){
    var tempURL = site.value;
    site.value="";
    if(isURL(tempURL)){
      deleteFromBlackList(tempURL,blackList);
      alert("Remove successfully");
    }else{
      alert("URL is not valid");
    }
  })
}


function blockRequest(details) {  
  
  return {cancel: (details.url.indexOf("https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js") == -1 &&
                   details.url.indexOf("https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js") == -1 &&
                   details.url.indexOf("google.com/") == -1 &&
                   details.url.indexOf("https://cdn.bootcss.com") == -1 &&
                   details.url.indexOf("https://cdn.jsdelivr.net/npm/vue@2.6.11") == -1 &&
                   details.url.indexOf("https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js") == -1 &&
                   details.url.indexOf("https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css") == -1 &&
                   details.url.indexOf("https://fonts.googleapis.com/css2?family=Quicksand&display=swap") == -1
  )}; 
}  


function blockAllWeb(){
  chrome.webRequest.onBeforeRequest.addListener(
    blockRequest,
    {urls: 
      ["http://*/*", "https://*/*"]
    },
    ["blocking"]
  );
 }

 function blockPartWeb(){
  chrome.webRequest.onBeforeRequest.removeListener(
    blockRequest,
    {urls: 
      ["http://*/*", "https://*/*"]
    },
    ["blocking"]
  );
  chrome.webRequest.onBeforeRequest.addListener(
    blockRequest,
    {urls: 
      blackList
    },
    ["blocking"]
  );
 }

 if(blockAll){
  blockAll.addEventListener('click',function(){
    blockAll.disabled= true;
    blockPart.disabled=false;
    console.log("Running block All")
    blockAllWeb();
  })
  
 }

if(blockPart){
  blockPart.addEventListener('click',function(){
    blockAll.disabled= false;
    blockPart.disabled=true;
    console.log("Running block part");
    blockPartWeb();
  
    
  })
}