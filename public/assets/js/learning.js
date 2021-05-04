document.querySelectorAll(".learn").forEach((item) => {
  item.addEventListener("click", playedGame);
});

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
