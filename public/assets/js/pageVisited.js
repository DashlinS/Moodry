document.querySelectorAll(".visited").forEach((page) => {
  page.addEventListener("click", visited);
});

var games = 0
var learning = 0
var activities = 0

function visited(event){
  const visited = event.target.innerHTML;
  
  if(visited == "Games"){
    games = games + 1
  }
  else if(visited == "Learning"){
    learning = learning + 1
  }
  else if(visited == "Activities"){
    activities = activities + 1
  }
  console.log(games)
  fetch("pageVisited", {
    method: "POST",
    body: JSON.stringify({
      games: games,
      learning: learning,
      activities: activities
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
}
