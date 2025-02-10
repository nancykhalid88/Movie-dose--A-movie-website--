const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "5608062d25639e60cc83e9d4e78d7066";

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');

// Search function
async function searchMovies(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error("Error");
    }
}

// Display search results
function displaySearchResults(movies) {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = '';

    if (movies.length === 0) {
        searchResultsContainer.innerHTML = '<p>No movies found.</p>';
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('search-movie-card');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h5>${movie.title}</h5>
            <p>Rating: ${movie.vote_average.toFixed(1)}</p>
            <button class="watchlist-btn" data-id="${movie.id}">Add to Watchlist</button>
        `;
        movieElement.querySelector('.watchlist-btn').addEventListener('click', function () {
            addToWatchlist(movie.id);
        });
        movieElement.addEventListener('click', () => {
            window.location.href = `movieDetails.html?id=${movie.id}`;
        });
        searchResultsContainer.appendChild(movieElement);
    });
}

// Add to the watchlist
function addToWatchlist(movieId) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert("Movie added to your watchlist!");
    } else {
        alert("Movie is already in your watchlist.");
    }
}

// Perform the search
if (query) {
    searchMovies(query);
} else {
    document.getElementById('search-results-container').innerHTML = '<p>No search query provided.</p>';
}
