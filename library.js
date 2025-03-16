const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const bookGrid = document.getElementById('bookGrid');
const loadingIndicator = document.createElement('div');
loadingIndicator.id = 'loadingIndicator';
loadingIndicator.innerText = 'Loading...';
loadingIndicator.style.display = 'none';
loadingIndicator.style.position = 'fixed';
loadingIndicator.style.top = '50%';
loadingIndicator.style.left = '50%';
loadingIndicator.style.transform = 'translate(-50%, -50%)';
loadingIndicator.style.fontSize = '30px';
document.body.appendChild(loadingIndicator);

const suggestedBookGrid = document.getElementById('suggestedBookGrid');

const suggestedBooks = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL82563W/To_Kill_a_Mockingbird'
  },
  {
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL73477W/1984'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231856-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL152403W/Pride_and_Prejudice'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL276501W/The_Great_Gatsby'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL276501W/Moby_Dick'
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL276501W/War_and_Peace'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL276501W/The_Catcher_in_the_Rye'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    bookUrl: 'https://openlibrary.org/works/OL276501W/The_Hobbit'
  }
];

suggestedBooks.forEach((book) => {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';

  bookCard.innerHTML = `
    <img src="${book.coverUrl}" alt="${book.title} cover">
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <button class="btn-readbook" onclick="window.open('${book.bookUrl}', '_blank')">Read Book</button>
  `;

  suggestedBookGrid.appendChild(bookCard);
});

searchButton.addEventListener('click', async () => {
  const query = searchInput.value;
  if (!query) return;

  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();

    bookGrid.innerHTML = '';
    data.docs.forEach((book) => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';

      const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150';
      const bookUrl = `https://openlibrary.org${book.key}`;

      bookCard.innerHTML = `
        <img src="${coverUrl}" alt="${book.title} cover">
        <h3>${book.title}</h3>
        <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        <p>First Published: ${book.first_publish_year || 'N/A'}</p>
        <button class="btn-readbook" onclick="window.open('${bookUrl}', '_blank')">Read Book</button>
      `;

      bookGrid.appendChild(bookCard);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    loadingIndicator.style.display = 'none';
  }
});

searchInput.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value;
    if (!query) return;

    loadingIndicator.style.display = 'block';

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();

      bookGrid.innerHTML = '';
      data.docs.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150';
        const bookUrl = `https://openlibrary.org${book.key}`;

        bookCard.innerHTML = `
          <img src="${coverUrl}" alt="${book.title} cover">
          <h3>${book.title}</h3>
          <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p>First Published: ${book.first_publish_year || 'N/A'}</p>
          <button class="btn-readbook" onclick="window.open('${bookUrl}', '_blank')">Read Book</button>
        `;

        bookGrid.appendChild(bookCard);
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }
});
