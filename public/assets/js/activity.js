document.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", doActivity, { once: true });
});

function doActivity(event) {
  const activity = event.target.innerHTML;

  fetch("/doActivity", {
    method: "POST",
    body: JSON.stringify({
      activity: activity,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
}
