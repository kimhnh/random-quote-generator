const author = document.getElementById('author');
const copyQuote = document.getElementById('copyQuote');
const quote = document.getElementById('quote');
const flashMessage = document.querySelector('.flash-message');
const refreshQuote = document.getElementById('refreshQuote');

// Fetch API
async function randomQuote() {
  try {
    const res = await fetch('https://api.quotable.io/quotes/random');
    const data = await res.json();
    author.textContent = data[0].author;
    quote.textContent = `\u201c${data[0].content}\u201d`;

    // Empty tag div per API Request
    const tagBlock = document.querySelector('.tag-block');
    tagBlock.innerHTML = '';

    // Dynamically add tags
    if (data[0].tags.length > 0) {
      for (let i = 0; i < data[0].tags.length; i++) {
        let tag = document.createElement('span');
        tag.textContent = data[0].tags[i];
        tagBlock.appendChild(tag);
      }
    }

    // Copy quote&author button
    copyQuote.addEventListener('click', async function () {
      const copy = `"${data[0].content}" - ${data[0].author}`;
      await navigator.clipboard.writeText(copy);
      flashMessage.classList.remove('hidden');
      setTimeout(() => {
        flashMessage.classList.add('hidden');
      }, '1500');
    });
  } catch (e) {
    console.log(e);
  }
}

// Refresh button
refreshQuote.addEventListener('click', () => {
  randomQuote();
});

// Random quote when page is loaded
randomQuote();
