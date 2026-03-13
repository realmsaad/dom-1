const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Bernard Arnault & family",
  "Jensen Huang",
  "Warren Buffett",
  "Rob Walton & family",
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      // listItem.classList.add("right");
      // listItem.classList.add("wrong");
      // listItem.classList.add("over");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p> <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListener();
}

function dragStart() {
  // console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
  
}
function dragOver(e) {
  e.preventDefault();
  // console.log("Event: ", "dragover");
}
function dragEnter() {
  // console.log("Event: ", "dragenter");
}
function dragLeave() {
  // console.log("Event: ", "dragleave");
}
function dragDrop() {
  // console.log("Event: ", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
  // console.log(dragEndIndex);
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  //ya code logic new add kia hai taki number bhi swap ho jaye
  const numberOne = listItems[fromIndex].querySelector(".number");
  const numberTwo = listItems[toIndex].querySelector(".number");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
  // console.log(itemOne, itemTwo); 

  // yaha number swap ho raha
  const temp = numberOne.innerText;
  numberOne.innerText = numberTwo.innerText;
  numberTwo.innerText = temp;
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
      item.classList.remove("right");
    } else {
      item.classList.add("right");
      item.classList.remove("wrong");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);