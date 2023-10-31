document.addEventListener('DOMContentLoaded', () => {
  const author = document.getElementById('author');
  const tagTwo = document.getElementById('tagTwo');
  const quote = document.getElementById('quote');

  const copyQuote = document.getElementById('copyQuote');
  const refreshQuote = document.getElementById('refreshQuote');

  // Fetch a quote from API
  async function randomQuote() {
    try {
      const res = await fetch('https://api.quotable.io/quotes/random');
      const data = await res.json();
      console.log(data);
      author.textContent = data[0].author;
      quote.textContent = `\u201c${data[0].content}\u201d`;

      // Dynamically add tags based on quote
      if (data[0].tags.length > 0) {
        for (let i = 0; i < data[0].tags.length; i++) {
          let tag = document.createElement('span');
          tag.textContent = data[0].tags[i];
          document.querySelector('.tag-block').appendChild(tag);
        }
      }

      // Copy quote&author button
      copyQuote.addEventListener('click', async function () {
        const copy = `"${data[0].content}" - ${data[0].author}`;
        await navigator.clipboard.writeText(copy);
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Refresh button --> Scuffed method. Not sure how to recall API and delete existing data.
  refreshQuote.addEventListener('click', () => {
    location.reload();
  });

  // Random quote when page is loaded
  randomQuote();
});
