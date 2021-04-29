document.querySelectorAll('.four-motions').forEach(mood => {
  mood.addEventListener("click", getMood, { once: true });
})
let clicked = false

function getMood(event){
  const moodAnimation = event.target;
  const moodPicked = event.target.getAttribute("data-value")

  moodAnimation.onclick = () => {
    moodAnimation.classList.add("miniBounce");
    setTimeout(removeMiniBounce, 1000);
    fetch("/moodPicked", {
      method: "POST",
      body: JSON.stringify({ moodPicked: moodPicked }),
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" },
    }).then((response) => response.json());
  };

  setTimeout(() => moodAnimation.classList.remove("bounce"), 1000);
  moodAnimation.classList.remove("miniBounce");
  function removeMiniBounce() {
  }

  // console.log(moodPicked)
}  
