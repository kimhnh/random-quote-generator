'use strict';

const footerContainer = document.querySelector('.footer__icon');
const quote = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.info__author');
const quoteCopy = document.querySelector('footer__icon--copy');
const quoteRefresh = document.querySelector('.footer__icon--refresh');
const flashMessage = document.querySelector('.flash-message');

// Fetch API
async function randomQuote() {
  try {
    const res = await fetch('https://api.quotable.io/quotes/random');
    const data = await res.json();
    const { author, content, tags } = data[0];
    quoteAuthor.textContent = author;
    quote.textContent = `"${content}"`;

    // Empty tag div per API Request
    const tagsContainer = document.querySelector('.info__tag');
    tagsContainer.innerHTML = '';

    // Dynamically add tags
    tags.forEach((tag) => {
      tagsContainer.insertAdjacentHTML('beforeend', `<span>${tag}</span>`);
    });
  } catch (e) {
    console.log(e);
  }
}
randomQuote();

// Copy quote (Clipboard API)
async function copyQuote() {
  await navigator.clipboard.writeText(`${quote.textContent} - ${quoteAuthor.textContent}`);
  flashMessage.textContent = 'Copied to clipboard';
  flashMessage.classList.remove('hidden');

  // remove message
  setTimeout(() => {
    flashMessage.classList.add('hidden');
  }, 1500);
}

// Event-handler
footerContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('footer__icon--refresh')) randomQuote();
  if (e.target.classList.contains('footer__icon--copy')) copyQuote();
});
