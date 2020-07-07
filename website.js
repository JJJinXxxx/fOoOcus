var app = new Vue({
    el: '#app',
    data: function() {
        return { visible: false }
    }
    })
var blockAll = document.getElementById("blockAll");
var blockPart = document.getElementById("blockPart");

blockAll.addEventListener('click',function(){
    blockAll.disabled= true;
    blockPart.disabled=false;
    console.log("Reached the button");
    chrome.storage.sync.set({blockSetting: "blockAll"},function(){});
})

blockPart.addEventListener('click',function(){
    blockAll.disabled= false;
    blockPart.disabled=true;
    chrome.storage.sync.set({blockSetting: "blockPart"},function(){});
})