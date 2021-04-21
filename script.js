var startTime;

const vid = document.getElementById("bgvid");
const mus = document.getElementById("bgmsc");
const apmsg = document.getElementById("autoPlayMsg");
const clickCatcher = document.getElementById("clickCatcher");

vid.load();
mus.load();

mus.loop = vid.loop = true;
mus.volume = 1;

if (vid.paused || mus.paused) {
	vid.pause();
	mus.pause();
}

function setVidPos() {
	vid.style.top = (window.innerHeight / 2 - vid.clientHeight / 2) + "px";
}

vid.onplay = function() {
	clearInterval(flashyflash);
	apmsg.style.display = "none";
	if(!startTime)
		startTime = Date.now();
}

clickCatcher.onclick = () => {
	vid.play();
	mus.play();
}

vid.addEventListener('loadeddata', setVidPos, false);
window.addEventListener('resize', setVidPos, false);


function flash(queue) {
	switch (apmsg.style.color) {
		case 'red':
			apmsg.style.color = "yellow";
			break;

		case 'yellow':
			apmsg.style.color = "red";
			break;

		default:
			apmsg.style.color = "red";
	}
	if (queue)
		for (let i = 0; i < 10; i++)
			setTimeout(flash, 125 * i);
}

var flashyflash = setInterval(() => {
	if (apmsg.style.display != "none") {
		flash(true);
	} else {
		clearInterval(flashyflash);
	}
}, 5000);

setInterval(() => {
	if (startTime)
		document.getElementById("time").innerText = ((Date.now() - startTime) / 1000).toFixed(1);
}, 100);