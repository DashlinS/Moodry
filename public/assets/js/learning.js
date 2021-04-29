document.querySelectorAll(".learn").forEach((item) => {
  item.addEventListener("click", playedGame);
});

var geometry = 0;
var eventCount = 0;

function playedGame(event) {
  const learnName = event.target.getAttribute("data-value");
  console.log(learnName);

  fetch("/learnCreate", {
    method: "POST",
    body: JSON.stringify({
      learnName: learnName,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
}
