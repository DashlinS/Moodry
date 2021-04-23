fetch("/tableCreate")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    if (data.length > 0) {
      // document.querySelector(".hideTable").style.display = "block";
      // document.querySelector("#tableWrapper").style.display = "block";
      let moodTable = document.querySelector(".mood");
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
