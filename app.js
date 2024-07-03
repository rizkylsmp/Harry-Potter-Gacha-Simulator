var Legendary_RATE = 0.02;
var Rare_RATE = 0.2;
var Common_RATE = 0.53;

function init(data) {
  var charactersData = data;

  document.querySelector(".pull-single").addEventListener("click", function () {
    pullCharacter("single");
  });

  document.querySelector(".pull-multi").addEventListener("click", function () {
    pullCharacter("multi");
  });

  function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  var activeBanner = getQueryParameter("activeBanner") || "default";

  console.log("activeBanner: " + activeBanner);

  function getRandomCharacter(rarity) {
    var characters = charactersData[rarity];

    var randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  function pullCharacter(pullType) {
    var gachaWindow = document.querySelector(".gacha-window");

    function doPull() {
      var rarity;
      var randomLegendary = Math.random();
      if (randomLegendary <= Legendary_RATE) {
        rarity = "Legendary";
      } else if (randomLegendary <= Rare_RATE) {
        rarity = "Rare";
      } else {
        rarity = "Common";
      }
      var character = getRandomCharacter(rarity);
      displayCharacter(character, gachaWindow);
    }

    if (pullType === "single") {
      if (gachaWindow.children.length >= 10) {
        gachaWindow.innerHTML = "";
      }
      doPull();
    } else if (pullType === "multi") {
      gachaWindow.innerHTML = "";

      for (var i = 0; i < 10; i++) {
        doPull();
      }
    }
  }

  function displayCharacter(character, gachaWindow) {
    try {
      var characterImage = document.createElement("img");

      characterImage.src = character.image;
      characterImage.alt = character.name;
      characterImage.className = "gacha-card";
      var category = Object.keys(charactersData).find((key) =>
        charactersData[key].includes(character)
      );
      switch (category) {
        case "Legendary":
          characterImage.classList.add("gold-border");
          break;
        case "Rare":
          characterImage.classList.add("purple-border");
          break;
        case "Common":
          characterImage.classList.add("blue-border");
          break;
      }
      gachaWindow.appendChild(characterImage);
    } catch (error) {
      console.error("Error displaying character:", error);
    }
  }
}

fetch("./data/characters.json")
  .then((response) => response.json())
  .then((data) => {
    init(data);
  })
  .catch((error) => {
    console.error("Error loading characters data:", error);
  });

const playPauseBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.classList.remove("play");
    playPauseBtn.classList.add("pause");
  } else {
    audio.pause();
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
  }
});
