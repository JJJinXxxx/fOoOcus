var app = new Vue({
    el: '#app',
    data: function() {
        return { visible: false }
    }
    });

var homepage = document.getElementById("homepage");
homepage.addEventListener('click',function(){
    console.log("I'm here");
    chrome.tabs.update({url:"/homePage.html"});
});

chrome.storage.sync.get(['key'],function(result){
    var dataStored = result.key;
    console.log(dataStored);
    var startTime = null;
    var endTime = null;
    var timeData = [];
    var concentrationData = [];
    var totalTime = 0;
    var hardestSlot = 0;
    var adviseButton = document.getElementById("adviseButton");
    var reportButton = document.getElementById("reportButton");
    var myChart = echarts.init(document.getElementById('main'));
    adviseButton.addEventListener('click',function(){
        var suggestions=document.getElementById("suggestion");
        suggestions.innerHTML = "Get organized and try to study in the morning instead of evening since you are distracted a lot at that time."
    })

     
    var option = {
        angleAxis: {
            type: 'category',
            data: ['0800','1000', '1200', '1400', '1600', '1800', '2000']
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            name:"Concentration",
            step: 'end',
            data: [20, 32, 1, 34, 29, 33, 100],
            type: 'bar',
            coordinateSystem: 'polar',
            itemStyle:{
                normal:{
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[
                        {offset: 0, color:'#c1cbd7'},
                        {offset:0.5, color:'#9ca8b8'},
                        {offset:1,color:'#8696a7'}
                    ])
                }
            }
        }],
        legend: {
            show: true,
            data:['专注度']
        }
    };
    myChart.setOption(option);
    console.log(dataStored === "undefined");

    if(dataStored ===null || typeof dataStored === "undefined"){
        console.log("Nothing happens");
    }else{
        startTime=dataStored[0][0];
        endTime=dataStored[dataStored.length-1][1];
        for(var i =0; i < dataStored.length; i++){
            timeData.push(dataStored[i][0]);
            timeData.push(dataStored[i][1]);
            concentrationData.push(dataStored[i][3]);
            concentrationData.push(0);
            totalTime = totalTime + dataStored[i][2];
            if(dataStored[i][3] > dataStored[hardestSlot][3]){
                hardestSlot = i;
            }
        }

        reportButton.addEventListener('click',function(){
            myChart.setOption({
                angleAxis:{
                    data:timeData
                },
                series:[{
                    data:concentrationData
                }]
            });
            var startStudyTime = document.getElementById("startStudyTime");
            var stopStudyTime = document.getElementById("stopStudyTime");
            var totalStudyTime = document.getElementById("totalTime");
            var slot1=document.getElementById("slot1");
            var slot2=document.getElementById("slot2");
            slot1.innerHTML = dataStored[hardestSlot][0];
            slot2.innerHTML = dataStored[hardestSlot][1];
            startStudyTime.innerHTML=startTime;
            stopStudyTime.innerHTML =endTime;
            totalStudyTime.innerHTML = totalTime/60000 + " mintues";
        })


    }
    





})