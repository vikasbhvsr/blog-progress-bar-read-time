const post = document.getElementById("blog");
const progress = document.getElementById("reading-progress");
let inViewport = false;

let observer = new IntersectionObserver(handler);

observer.observe(post);

//Whenever the post comes in or out of view, this handler is invoked.
function handler(entries, observer) {
	for (entry of entries) {
		if (entry.isIntersecting) {
			inViewport = true;
		} else {
			inViewport = false;
		}
	}
}

// Get the percentage scrolled of an element. It returns zero if its not in view.
function getScrollProgress(el) {
	let coords = el.getBoundingClientRect();
	let height = coords.height;
	let progressPercentage = 0;

	if (inViewport && coords.top < 0) {
		progressPercentage = (Math.abs(coords.top) / height) * 100;
	}

	return progressPercentage;
}

function showReadingProgress() {
	progress.setAttribute("value", getScrollProgress(post));
}

//scroll event listener
let timeout;
window.onscroll = function () {
	if (timeout) {
		window.cancelAnimationFrame(timeout);
	}

	timeout = window.requestAnimationFrame(function () {
		showReadingProgress();
	});
};

const readingTimeSummary = document.querySelector(".reading-time .summary");
// const readingTimeDetails = document.querySelector(".reading-time details span");
const avgWordsPerMin = 250;

setReadingTime();

function setReadingTime() {
	let count = getWordCount();
	let time = Math.ceil(count / avgWordsPerMin);

	readingTimeSummary.innerText = time + " min read";
	readingTimeDetails.innerText =
		count + " words read at " + avgWordsPerMin + " words per minute.";
}

function getWordCount() {
	return post.innerText.match(/\w+/g).length;
}
