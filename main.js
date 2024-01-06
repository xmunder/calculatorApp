const buttons = document.querySelectorAll("button");
let continueOperation = document.createElement("p");
const contentMain = document.getElementById("display-container");

let textDisplay = document.getElementById("displayText");
let text = "";

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    text += e.target.textContent;
    showDisplay();

    if (e.target.textContent === "=") {
      result();
      restartMirror();
    }
    if (e.target.textContent === "C") {
      text = "";
      showDisplay();
      restartMirror();
      mirror();
    }
    if (text.length > 2 && text.includes("=")) {
      if (
        text.includes("+") ||
        text.includes("-") ||
        text.includes("*") ||
        text.includes("/")
      ) {
        text = text.replace(/=/g, "");
        showDisplay();
        restartMirror();
        mirror();
      } else {
        text = text.replace(/=/g, "");
        showDisplay();
        restartMirror();
      }
    }
    mirror();
  });
});

function showDisplay() {
  textDisplay.innerText = text;
}

function mirror() {
  text = text.replace(/=/g, "");
  if (
    text.includes("+") ||
    text.includes("-") ||
    text.includes("*") ||
    text.includes("/")
  ) {
    if (text.length > 2) {
      if (typeof text === "string") {
        if (eval(text) === Math.floor(eval(text))) {
          continueOperation.innerText = `${eval(text)}`;
          contentMain.appendChild(continueOperation);
        } else if (eval(text) != Math.floor(eval(text))) {
          continueOperation.innerText = `${eval(text).toPrecision(3)}`;
          contentMain.appendChild(continueOperation);
        }
        if (!isFinite(eval(text))) {
          continueOperation.innerText = "MATH ERROR";
          contentMain.appendChild(continueOperation);
        }
      }
    }
  } else if (text === "") {
    continueOperation.innerText = "";
    contentMain.appendChild(continueOperation);
  }
}

function restartMirror() {
  continueOperation.innerText = "";
}

function result() {
  try {
    text = text.replace(/=/g, "");
    if (eval(text) === Math.floor(eval(text))) {
      text = eval(text);
    } else if (eval(text) != Math.floor(eval(text))) {
      text = eval(text).toPrecision(3);
    }
    if (!isFinite(text)) {
      throw new Error("MATH Error");
    }
    showDisplay();
    text = `${text}=`;
  } catch (error) {
    contentMain.style.textAlign = "right";
    text = "MATH Error";
    showDisplay();
  }
}
