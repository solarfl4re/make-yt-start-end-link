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
	}

function testGetYtUrl() {
  let ytUrl1 = 'https://www.youtube.com/watch?v=MnynrNNVDy8';
  let ytUrl2 = 'https://youtu.be/MnynrNNVDy8';

  // Test YT url parse
  console.log(getYtId(ytUrl1));
  console.log(getYtId(ytUrl2));
}

window.addEventListener('load', setup);
