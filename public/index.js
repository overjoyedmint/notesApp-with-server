let text = document.getElementById("note");

let arrayList = JSON.parse(localStorage.todo || "[]");

function saveNote() {
  if (!text.value) {
    return alert("please enter a note");
  } else {
    arrayList.push(text.value);
    localStorage.setItem("todo", JSON.stringify(arrayList));

    text.value = "";
  }
}
