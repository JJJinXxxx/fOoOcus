/*
统计网页停留时长
*/
function save()
{
    var channels = $("#channels").val();
    var keywords = $("#keywords").val();

    chrome.storage.local.set({'channels': channels});
    chrome.storage.local.set({'keywords': keywords});
}

function load() {
    var channels = "";
    var keywords = "";
    chrome.storage.local.get('channels', function (result) {
        channels = result.channels;
        alert(result.channels);
        $("#channels").val(channels);
    });
} 
