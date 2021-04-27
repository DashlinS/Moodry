document.querySelectorAll(".games").forEach((ele) => {
 ele.addEventListener("click", playedGame);
});

function playedGame(event) {
  console.log('clicked')
}
