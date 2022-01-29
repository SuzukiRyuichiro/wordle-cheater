const showAnswer = answer => {
  document.getElementById("answer").innerHTML = answer.toUpperCase().split("").map(letter => {
		return `<div class="tile">${letter}</div>`;
	}).join("");
}

document.addEventListener('DOMContentLoaded', () => {
	const key = "gameState";

	// Get the current tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, (tabs) => {
		const tab = tabs[0];

		// Execute script in the current tab
		chrome.tabs.executeScript(tab.id, {
			code: `JSON.parse(localStorage['${key}'])?.solution`
		}, (result) => {
			showAnswer(result[0])
		})
	})
});
