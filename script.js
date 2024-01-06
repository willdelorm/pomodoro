const display = document.getElementById("display");
const btnTimes = Array.from(document.getElementsByClassName("btn-times"));
const btnControls = Array.from(document.getElementsByClassName("btn-controls"));

let timer;

btnTimes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActiveTimes();
    btn.classList.add("active");

    resetTime();
    disableControls();
    btnControls
      .filter((btn) => btn.value === "start")
      .forEach((btn) => enableControl(btn));
  });
});

btnControls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    disableControls();
    switch (e.target.value) {
      case "start":
        startTime();
        btnControls
          .filter((btn) => btn.value !== "start")
          .forEach((btn) => enableControl(btn));
        disableTimers();
        break;
      case "stop":
        stopTime();
        btnControls
          .filter((btn) => btn.value !== "stop")
          .forEach((btn) => enableControl(btn));
        enableTimers();
        break;
      case "reset":
        resetTime();
        btnControls
          .filter((btn) => btn.value === "start")
          .forEach((btn) => enableControl(btn));
        enableTimers();
        break;
    }
  });
});

function removeActiveTimes() {
  btnTimes.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function enableTimers() {
  btnTimes.forEach((btn) => btn.removeAttribute("disabled"));
}

function disableTimers() {
  btnTimes.forEach((btn) => btn.setAttribute("disabled", ""));
}

function enableControl(btn) {
  btn.classList.add("active");
  btn.removeAttribute("disabled");
}

function disableControls() {
  btnControls.forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("disabled", "");
  });
}

function startTime() {
  let [minutes, seconds] = display.value.split(":");
  if (minutes === "00" && seconds === "00") {
    stopTime();
    return;
  }

  if (seconds === "00") {
    minutes = formatDigits(minutes - 1);
    seconds = "59";
  } else {
    seconds = formatDigits(seconds - 1);
  }

  display.value = minutes + ":" + seconds;

  timer = setTimeout(startTime, 1000);
}

const stopTime = () => clearTimeout(timer);

const resetTime = () => {
  stopTime();
  let newTime = btnTimes.filter((btn) => btn.classList.contains("active"))[0]
    .value;
  setTimer(newTime);
};

const formatDigits = (digit) => (Number(digit) < 10 ? "0" + digit : digit);

const setTimer = (val) => {
  const minutes = formatDigits(val);
  display.value = `${minutes}:00`;
};
