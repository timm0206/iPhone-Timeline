window.addEventListener("DOMContentLoaded", loadSVG);
window.addEventListener("DOMContentLoaded", loadJSON);

function loadSVG() {
  console.log("Load the SVG");
  fetch("background-01.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("The SVG is loaded!");

      document.querySelector("#svg").insertAdjacentHTML("afterbegin", svgdata);
    });

  console.log("Load the SVG");
  fetch("timeline-2-01.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("Loaded SVG");

      document
        .querySelector("#timelineDiv")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}

function loadJSON() {
  fetch("data.json")
    .then(data => data.json())
    .then(jsonData => {
      buttons = document.querySelectorAll("#timeline .year-container");
      document.querySelector("#click-right-1").addEventListener("click", () => {
        document.querySelector("#timelineDiv").style.transform =
          "translateX(-100vw)";
      });
      document.querySelector("#click-right-2").addEventListener("click", () => {
        document.querySelector("#timelineDiv").style.transform =
          "translateX(-200vw)";
      });
      document.querySelector("#click-left-2").addEventListener("click", () => {
        document.querySelector("#timelineDiv").style.transform =
          "translateX(0vw)";
      });
      document.querySelector("#click-left-3").addEventListener("click", () => {
        document.querySelector("#timelineDiv").style.transform =
          "translateX(-100vw)";
      });

      for (let i = 0; i < buttons.length; i++) {
        let self = buttons[i];
        self.addEventListener("click", function(event) {
          jsonData.forEach(phone => {
            let temp = document.querySelector(".phoneTemplate");
            let dest = document.querySelector("#phoneDiv");
            let klon = temp.cloneNode(true).content;
            event.preventDefault();
            let circleSelector = "#year-" + phone.year + " > circle";
            document.querySelector(circleSelector).style.fill = "none";
            if (phone.year == event.target.textContent) {
              dest.textContent = "";

              klon.querySelector("h1").textContent = phone.name;
              klon.querySelector("img").src = "images/" + phone.image;
              klon.querySelector(".date").textContent = phone.date;
              klon.querySelector(".sold").textContent =
                "Sold first weekend: " + phone.sold;
              dest.appendChild(klon);
              document.querySelector(circleSelector).style.fill = "#2e0000";
            }
          });
        });
      }
    });
}
