// hudle the splash screen
const splashScreenSpan = document.querySelector(".control-buttons span");
splashScreenSpan.addEventListener("click", () => {
  document.querySelector(".control-buttons").remove();
});

// selecet main vars
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);
const winContainer = document.querySelector(".win");
const winTitle = document.querySelector(".win h2");
const winSpan = document.querySelector(".win .wronge-tries");
const blueScoreSpan = document.querySelector(".win .blue");
const redScoreSpan = document.querySelector(".win .red");
const restartButton = document.querySelector(".win button");
const turnInfoSpan = document.querySelector(".info-container .name span");
// set main options
let turn = "blue";
// set the span inner html to the turn
turnInfoSpan.innerHTML = turn;
turnInfoSpan.style.color = "blue";
let blueScore = 0;
let redScore = 0;
let duration = 1000;
let orderRange = [...Array(blocks.length).keys()]; // or i can use the array.from insted of spread op
// shuffle the order range array by the function
shuffle(orderRange);
// loop on game blocks and set random order prop
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // block click event
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});
// flip block function
function flipBlock(selecetedBlock) {
  // add class is-flipped
  selecetedBlock.classList.add("is-flipped");
  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // if there's two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking event
    stopClicking();
    // check matched blocks
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    // change turn
    changeTurn();
    // set the span inner html to the turn
    turnInfoSpan.innerHTML = turn;
  }
}

// stop clicking function
function stopClicking() {
  // add class no clicking on main container
  blocksContainer.classList.add("no-click");

  // remove class no clicking on main container after duration
  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}
// check matched blocks
function checkMatchedBlocks(first, second) {
  const triesElement = document.querySelector(".tries span");
  if (first.dataset.tec === second.dataset.tec) {
    // check who is the player and add 1 to his score
    if (turn === "blue") {
      blueScore++;
    } else {
      redScore++;
    }
    // i removed this class the flip block ganna run agine and check if 2 elements have is-flipped class
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    // add other class named has-matched this class ganna have the same style with the is-flipped class
    first.classList.add("has-matched");
    second.classList.add("has-matched");
    // play sound
    document.getElementById("success").play();
    // play the win finction
    win(triesElement);
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
    // play fail sound
    document.getElementById("fail").play();
  }
}

function changeTurn() {
  switch (turn) {
    case "blue":
      turn = "red";
      turnInfoSpan.style.color = "red";
      break;
    case "red":
      turn = "blue";
      turnInfoSpan.style.color = "blue";
      break;
  }
}

// win function
function win(tries) {
  // see if all of the blocks are matched
  let hasMatchedEle = blocks.filter((block) => {
    return block.classList.contains("has-matched");
  });
  // if the number of the matched blocks = blocks then all of them are flipped and matched
  if (hasMatchedEle.length === blocks.length) {
    // the time out to dont apply the changes before the last cards are flipped and there spund is played
    setTimeout(() => {
      // show win screen
      winContainer.style.display = "block";
      // add the title debend on who won
      blueScore > redScore
        ? (winTitle.innerHTML = "blue win")
        : redScore > blueScore
        ? (winTitle.innerHTML = "red win")
        : (winTitle.innerHTML = "draw");
      // show the wrongre tries
      winSpan.innerHTML = `wronge tries: ${tries.innerHTML}`;
      // show blue player score
      blueScoreSpan.innerHTML = `blue scored: ${blueScore} right answers`;
      // show red player score
      redScoreSpan.innerHTML = `red scored: ${redScore} right answers`;
      // play the win sound
      document.getElementById("win-sound").play();
      // hundle the restart button click event
    }, duration);
    // for the restart button
    restartButton.addEventListener("click", () => {
      window.location.reload();
    });
  }
}

// shuffle function
function shuffle(array) {
  // vars settings
  let current = array.length;
  let temp;
  let random;

  while (current > 0) {
    // get random number from array length range
    random = Math.floor(Math.random() * current);

    // decrease length by one
    current--;
    // [1] save current element in stash
    temp = array[current];
    // [2] current element = random element
    array[current] = array[random];
    // [3] random element = get element from stash
    array[random] = temp;
  }

  return array;
}
