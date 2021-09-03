// TODO:
// CSS: add space between elements, make responsive
// Add visual feedback on 'set start/end' (progress bar,
// with markers?)
// Show URL, add 'copy to clipboard' button. + show instructions on how to add to Ghost
// -> ? On 'replay', play from start --- end (site wide script?)
// 3.9:
// - translate to Ukrainian
// - show embed code to copy
let yVideo = {};

function setup() {
    let ytURL = '';
    let player;

    // Example URLs

    // load YT API js
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let ytForm = document.getElementById('ytUrlForm');
    ytForm.addEventListener('submit', loadVideo);

    document.getElementById('setStartButton').addEventListener('click', setTime);
    document.getElementById('setEndButton').addEventListener('click', setTime);
    document.getElementById('testEmbed').addEventListener('click', embedVideo);
    //document.getElementById('copy').addEventListener('click', copyURL);
    document.getElementById('copyEmbed').addEventListener('click', copyURL);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
    });
}


function getYtId(url) {
    if (url.indexOf('v=') !== -1) {
        let start = url.indexOf('v=') + 2;
        let end = url.indexOf('&');

        return url.substring(start, end !== -1 ? end : undefined)

    } else if (url.indexOf('youtu.be/') !== -1) {
        let start = url.indexOf('youtu.be/') + 9;
        let end = url.indexOf('?');

        return url.substring(start, end !== -1 ? end : undefined)

    } else {
        // take whole string as video id
        return url;
    }
}

function loadVideo(event) {
    // load video w/ yt api here
    let ytInput = document.getElementById('ytUrlInput').value
    let ytId = getYtId(ytInput)
    player.loadVideoById(ytId)
    event.preventDefault();

    //Add to video array
    yVideo.vID = ytId;
}

function testGetYtUrl() {
    let ytUrl1 = 'https://www.youtube.com/watch?v=MnynrNNVDy8';
    let ytUrl2 = 'https://youtu.be/MnynrNNVDy8';

    // Test YT url parse
    console.log(getYtId(ytUrl1));
    console.log(getYtId(ytUrl2));
}

function setTime(event) {
    let t = player.getCurrentTime().toFixed();

    let n = '';
    if (event.srcElement.id.indexOf('Start') !== -1) {
        n = 'start';
    } else {
        n = 'end';
    }

    // Update the displayed start or end
    document.getElementById(n).innerText = t;


    // set the start time here
    yVideo[n] = t;

    updateURL();
}

function updateURL() {
    // takes a time in seconds and updates the current output URL
    // url https://www.youtube.com/embed/ht4JtEbFtFI?start=53&end=59
    //let urlDiv = document.getElementById('shareURL');
    //let url = `https://www.youtube.com/embed/${yVideo.vID}?start=${yVideo.start ? yVideo.start : ""}&end=${yVideo.end ? yVideo.end : ""}`;

    //urlDiv.value = url;

    // Embed
    let embedDiv = document.getElementById('embedCode');
    embedDiv.value = getEmbedCode();

}

function copyURL(event) {
    document.getElementById('embedCode').select();
    document.execCommand('copy');
}

function embedVideo() {
    // embed video in div #embedTest here
    // Sample embed code:
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/ht4JtEbFtFI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    document.getElementById("embedTest").innerHTML = getEmbedCode()
}

function getEmbedCode() {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${yVideo.vID}?start=${yVideo.start}&end=${yVideo.end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

window.addEventListener('load', setup);
