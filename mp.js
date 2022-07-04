      var currIndex = 0;
      var isPlaying = false;
      var isPlayDisabled = true;
      var currSong = new Audio(songsList[currIndex]["link"]);

      var songThumb = document.querySelector(".song-thumb");
      var songTitle = document.querySelector(".song-info-title");
      var songArtist = document.querySelector(".song-info-artist");
      var songAlbum = document.querySelector(".song-info-album");

      var stateButton = document.querySelector(".player-state-btn");
      var songProgressBar = document.querySelector(".song-progress-value");
      var volumeSlider = document.querySelector("#volume-slider");
      var volumeTrail = document.querySelector(".volume-trail");

      setSong();

      function setSong() {
        isPlayDisabled = true;
        isPlaying = false;

        // Set icon to loading
        stateButton.classList =
          "fas fa-spinner player-state-btn player-load-btn";

        // Disable play button
        stateButton.style.cursor = "wait";

        // Set song
        songTitle.innerHTML = songsList[currIndex]["title"];
        songArtist.innerHTML = songsList[currIndex]["artist"];
        songAlbum.innerHTML = songsList[currIndex]["album"];
        songThumb.style.backgroundImage = `url(${songsList[currIndex]["thumb"]})`;
        currSong.src = songsList[currIndex]["link"];
        currSong.pause();
      }

      function nextSong() {
        currIndex = (currIndex + 1) % songsList.length;
        setSong();
      }
      function prevSong() {
        currIndex = (currIndex - 1) % songsList.length;
        setSong();
      }
      function toggleState() {
        if (isPlayDisabled) return;
        if (isPlaying) {
          currSong.pause();
          stateButton.classList = "fas fa-play-circle player-state-btn";
        } else {
          currSong.play();
          stateButton.classList = "fas fa-pause-circle player-state-btn";
        }
        isPlaying = !isPlaying;
      }
      function adjustVolume(currVol) {
        currSong.volume = currVol;
        console.log(currVol, currVol !== "0", currVol !== 0);
        if (currVol !== "0" && currVol !== 0)
          volumeTrail.style.width = `${currVol * 100 - 2}%`;
        else volumeTrail.style.width = "0%";
        volumeSlider.value = currVol;
      }
      currSong.addEventListener("timeupdate", () => {
        let currPosition = (currSong.currentTime / currSong.duration) * 600;
        if (!isNaN(currPosition))
          songProgressBar.setAttribute(
            "stroke-dasharray",
            `${currPosition} ${600 - currPosition}`
          );
        else songProgressBar.setAttribute("stroke-dasharray", "0 600");
      });

      // Buffer song before playing
      currSong.addEventListener("canplay", (event) => {
        isPlayDisabled = false;

        // Set icon to play
        stateButton.classList = "fas fa-play-circle player-state-btn";

        // Enable play button
        stateButton.style.cursor = "pointer";
      });
