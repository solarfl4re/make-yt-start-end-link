let yVideos = [];

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
}
	
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
				}
					);
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
    yVideos.push({vID: ytId});
	}

function testGetYtUrl() {
  let ytUrl1 = 'https://www.youtube.com/watch?v=MnynrNNVDy8';
  let ytUrl2 = 'https://youtu.be/MnynrNNVDy8';

  // Test YT url parse
  console.log(getYtId(ytUrl1));
  console.log(getYtId(ytUrl2));
}

function setTime(event) {
  let n = '';
  if (event.srcElement.id.indexOf('Start') !== -1) {
    n = 'start';
  } else {
    n = 'end';
  }

  // set the start time here
  let t = player.getCurrentTime().toFixed();
  yVideos[yVideos.length -1][n] = t;
}

function embedVideo() {
  // embed video in div #embedTest here
  // Sample embed code:
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/ht4JtEbFtFI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  document.getElementById("embedTest").innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${yVideos[0].vID}?start=${yVideos[0].start}&end=${yVideos[0].end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

window.addEventListener('load', setup);
