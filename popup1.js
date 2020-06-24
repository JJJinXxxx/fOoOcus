// 跳转至指定页面
var btn = document.getElementById("open_url_new_tab");
btn.addEventListener('click',function(){
    chrome.tabs.create({url:"/homePage.html"});
},false)
var confirm = document.getElementById("confirm_button");
// confirm.addEventListener('click',function(){
//     $("#chkDiv :radio").each(function () {
//         console.log($(this).is(":checked"));
//         console.log($(this).val());
//         var trueSex = $(this).val();
//         console.log('trueSex', trueSex);
//         document.getElementById("p1").innerHTML=trueSex;
//     })
//     // document.getElementById("p1").innerHTML='go go';
// })
$(document).ready(function() {
    $('input[type=radio][name=mode]').change(function() {
        var clockmode = $('input[type=radio][name=mode]: checked').val();
        document.getElementById("p1").innerHTML=clockmode;
    });
});

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
  })