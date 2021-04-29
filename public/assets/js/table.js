fetch("/tableCreate")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    if (data.length > 0) {
      // document.querySelector(".hideTable").style.display = "block";
      // document.querySelector("#tableWrapper").style.display = "block";
      data.forEach((element) => {
        let tableBody = document.querySelector(".tableBody");

        let newRow = document.createElement("tr");
        let date = document.createElement("td");
        let title = document.createElement("td");
        let mood = document.createElement("td");
        date.innerText = element[0];
        mood.innerText = element[1];
        title.innerText = element[2];

        newRow.appendChild(title);
        newRow.appendChild(mood);
        newRow.appendChild(date);
        tableBody.appendChild(newRow);
      });
    } else {
      document.querySelector(".hideTable").style.display = "none";
      document.querySelector("#tableWrapper").style.display = "none";
    }
    console.log(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

  fetch("/gameCreate")
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      data.forEach((element) => {
        let tableBody = document.querySelector(".gameBody");
        let newRow = document.createElement("tr");
        let date = document.createElement("td");
        let played = document.createElement("td");
        let totalVisited = document.createElement("td");
        date.innerText = element[0];
        played.innerText = element[1];
        // totalVisited.innerText = element[2];

        newRow.appendChild(played);
        // newRow.appendChild(totalVisited);
        newRow.appendChild(date);
        tableBody.appendChild(newRow);
      });
    } else {
      document.querySelector(".hideTable").style.display = "none";
      document.querySelector("#tableWrapper").style.display = "none";
    }
    console.log(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

  fetch("/learnCreate")
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      data.forEach((element) => {
        let tableBody = document.querySelector(".learnBody");
        let newRow = document.createElement("tr");
        let date = document.createElement("td");
        let played = document.createElement("td");
        let totalVisited = document.createElement("td");
        date.innerText = element[0];
        played.innerText = element[1];
        // totalVisited.innerText = element[2];

        newRow.appendChild(played);
        // newRow.appendChild(totalVisited);
        newRow.appendChild(date);
        tableBody.appendChild(newRow);
      });
    } else {
      document.querySelector(".hideTable").style.display = "none";
      document.querySelector("#tableWrapper").style.display = "none";
    }
    console.log(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });