document.querySelectorAll(".games").forEach((game) => {
  game.addEventListener("click", playedGame);
});

function playedGame(event) {
 const gameName = event.target.getAttribute("data-value")
 console.log(gameName)

  let newEventCount = eventCount++;
  newEventCount = eventCount;
  console.log(eventCount)

  fetch("/gameCreate", {
    method: "POST",
    body: JSON.stringify({
      gameName: gameName,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
}


