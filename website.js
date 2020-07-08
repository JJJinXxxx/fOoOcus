var Main = {
  data() {
    return {
      input: ''
    }
  }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

var homePage = document.getElementById("homepage");
var faq = document.getElementById("faq");
var goToReport = document.getElementById("report");
goToReport.addEventListener('click',function(){
  chrome.tabs.update({url:"/report.html"});
});
faq.addEventListener('click',function(){
  chrome.tabs.create({url:"https://github.com/shawPLUSroot/fOoOcus/issues"});
})
homepage.addEventListener('click',function(){
  console.log("I'm here");
  chrome.tabs.update({url:"/homePage.html"});
});
