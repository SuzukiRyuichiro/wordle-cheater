const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const showAnswer = answer => {
  document.getElementById("answer").innerHTML = answer.split("").map((letter, index) => {
		return `<div class="tile" id="${numbers[index]}">${letter}</div>`;
	}).join("");
}

const flip = element => {
  element.classList.toggle("flip");
}

const getAnswer = () => {
  return JSON.parse(localStorage['gameState'])?.solution
}

document.addEventListener('DOMContentLoaded', () => {
	// Get the current tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, (tabs) => {
		const tab = tabs[0];

		// Execute script in the current tab
		chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
			func: getAnswer,
		}, (result) => {
      const answer = result[0].result
			showAnswer(answer)
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(numbers[i])
        setTimeout(() => {
          flip(element)
        }, i * 100)
      }
		})
	})
});
