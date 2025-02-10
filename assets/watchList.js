const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "5608062d25639e60cc83e9d4e78d7066"; 
function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlist-items');
    watchlistContainer.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
    }

    watchlist.forEach(movieId => {
        fetchMovieDetails(movieId, watchlistContainer);
    });
}

async function fetchMovieDetails(id, container) {

    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const movie = await response.json();
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            <div class="movie-details">
                <h4>${movie.title}</h4>
                <button class="remove-btn" data-id="${movie.id}">Remove</button>
            </div>
        `;
        container.appendChild(movieElement);

        movieElement.querySelector('.remove-btn').addEventListener('click', function () {
            removeMovieFromWatchlist(movie.id);
        });
    } catch (error) {
        console.error('Error');
    }
}

function removeMovieFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(movieId => movieId.toString() !== id.toString());
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    loadWatchlist();
}


window.onload = loadWatchlist;
