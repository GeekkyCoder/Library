const bookNameEl = document.getElementById("bookName");
const auhtorNameEl = document.getElementById("author");
const tableBody = document.getElementById("tableBody");
const addNoteBtn = document.getElementById("noteBtn");
const fictionEl = document.getElementById("fiction");
const computerProgrammingEl = document.getElementById("computerProgramming");
const cookingEl = document.getElementById("cooking");

getTableHtml();

let rowItems = [];

addNoteBtn.addEventListener("click", () => {
  let bookValue = bookNameEl.value;
  let auhtorValue = auhtorNameEl.value;

  let type = "";

  if (fictionEl.checked) {
    type = "Fiction";
  } else if (computerProgrammingEl.checked) {
    type = "Programming";
  } else if (cookingEl.checked) {
    type = "Cooking";
  }

  rowItems.push({ bookName: bookValue, auhtor: auhtorValue, type: type });

  localStorage.setItem("data", JSON.stringify(rowItems));

  getTableHtml();
});

function getTableHtml() {
  let dataArray = JSON.parse(localStorage.getItem("data"));
  if (localStorage.length != 0 && dataArray.length > 0) {
    tableBody.innerHTML = dataArray
      .map((item, index) => {
        return `<tr>
             <td class='number'>${index + 1}</td>
             <td>${item.bookName}</td>
             <td>${item.auhtor}</td>
             <td>${item.type}</td>
             <td><button class="delBtn" onClick=deleteNote(${index})>remove</button></td>
           </tr>
             `;
      })
      .join("");
    localStorage.setItem("data", JSON.stringify(dataArray));
  } else {
    tableBody.innerHTML = `<p class='empty-note-para'>Add data by clicking the add note button above</p>`;
  }
}

function deleteNote(index) {
  let dataArray = JSON.parse(localStorage.getItem("data"));
  dataArray.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(dataArray));
  getTableHtml();
}
