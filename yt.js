	let ytURL = '';
	let player;

// Example URLs
let ytUrl1 = 'https://www.youtube.com/watch?v=MnynrNNVDy8';
let ytUrl2 = 'https://youtu.be/MnynrNNVDy8';
	
	// load YT API js
	    let tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
				}
					);
      }

const form = document.getElementById('ytUrlForm');
form.addEventListener('submit', loadVideo);

  function getYtId(url) {
    let starts = ['v=', 'youtu.be/']
    let ends = ['&', '?']

    //TODO: use 'for'
    for (let i = 0; found == true; i++)
    starts.forEach((start, i) => {
      let startPos = url.indexOf(start);
      if startPos !== -1 {
        let endPos = url.indexOf(ends[i]);
        let id = url.slice(
          startPos + start.length, endPos !== -1 ? endPos : '');



  }
	
	function loadVideo(event) {
// load video w/ yt api here
		alert(ytURL +"!")
    event.preventDefault();
	}

// Test YT url parse
console.log(getYtId(ytUrl1));
console.log(getYtId(ytUrl2));
