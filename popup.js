var app = new Vue({
    el: '#app',
    data: function() {
        return { 
            mode: '',
            options: [
                { value:0 , lable:'番茄吧唧模式' ,color:'red'},
                { value:1 , lable:'生命有限模式' ,color:'green'},
                { value:2 , lable:'暂不罢休模式' ,color:'green'},
                { value:3 , lable:'悬梁刺股模式' ,color:'red'},
                { value:4 , lable:'自由自在模式' ,color:'blue'},
              ]
         }
    }
    })

var btn = document.getElementById("open_url_new_tab");
btn.addEventListener('click',function(){
    chrome.tabs.create({url:"/homePage.html"});
},false)