document.querySelectorAll('.four-motions').forEach(mood => {
  mood.addEventListener('click', getMood)
})

function getMood(event){
  const moodPicked = event.target.getAttribute("data-value")
  console.log(moodPicked)
  fetch("/watch", {
    method: "POST",
    body: JSON.stringify({ moodPicked: moodPicked }),
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json" },
  }).then((response) => response.json());
}  



