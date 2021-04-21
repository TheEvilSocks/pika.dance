const picker = document.getElementById('picker');
var nowPlaying = "default";
var songs;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        songs = JSON.parse(this.responseText);
        var _songs = [];
        for (let key of Object.keys(songs))
            _songs.push([key, songs[key].info.name, songs[key].info.artist]);

        picker.innerHTML = _songs.map(s => {
            return `<option value="${s[0]}">${s[1]} - ${s[2]}</option>`;
        }).join("");
    }
}


xhr.open("GET", "/assets/audio/index.json", true);
xhr.send();

function songClick(song) {
    if (nowPlaying == song)
        return;
    if (songs[song]) {
        nowPlaying = song;
        mus.innerHTML = songs[song].files.map(f => {
            return `<source src="assets/audio/${f.file}" type="${f.mime}">`;
        }).join("");
        mus.load();
        mus.play();
        if (vid.paused)
            vid.play();
    }
}