let timelineTitles = null;
let timelineYears = null;
let soawrMenuHeight = null;
let timeSection = null;
let topHeight = 0;
let currentIndex = null;
let timelineDiv = document.querySelector("#timeline");

// SETS THE ACTIVE YEAR ON THE TIMELINE WHEN THE CONTENT IS IN VIEW
function setActiveYear(item, index) {
  if (currentIndex === index) {
    return;
  } else {
    currentIndex = index;

    if (index !== 0) {
      topHeight = (index + 1) * item.clientHeight;
      timelineDiv.style.transition = "all 0.5s ease-in-out";
    } else {
      topHeight = 0;
    }

    item.classList.add("active-time");
    item.classList.remove("inactive-time");

    timelineYears.forEach((time, i) => {
      if (i === index) return;

      time.classList.add("inactive-time");
      time.classList.remove("active-time");
    });
  }
}

// SETS THE TIME POSITION WHEN SCROLLING
function setTimeline() {
  if (timelineTitles[0].getBoundingClientRect().top < window.innerHeight / 2) {
    timelineDiv.style.position = "fixed";
    timelineDiv.style.top = `calc(50% - ${topHeight}px)`;
    active = false;
    currentIndex = null;
  } else {
    topHeight = 0;
    timelineDiv.style.transition = "none";
    timelineDiv.style.position = "relative";
    timelineDiv.style.top = "initial";
    timelineDiv.style.left = "initial";
  }
}

// SETS ALL THE VARIABLES WHEN THEY HAVE LOADED
function setVariables() {
  if (!timelineTitles) {
    timelineTitles = document.querySelectorAll(".block");
  }
  if (!timelineYears) {
    timelineYears = document.querySelectorAll(".timeline-item");
  }
  if (!soawrMenuHeight) {
    soawrMenuHeight = document.querySelector("#soawr-menu").clientHeight;
  }
  if (!timeSection) {
    timeSection = document.querySelector("#timeline-section");
  }
}

// CHECKS AND SETS THE ACTIVE YEAR ON SCROLL
document.addEventListener("scroll", function (e) {
  setVariables();
  setTimeline();

  timelineTitles.forEach((item, index) => {
    if (
      item.getBoundingClientRect().top <
      window.innerHeight / 2 - soawrMenuHeight
    ) {
      setActiveYear(timelineYears[index], index, item);
    }
  });
});
