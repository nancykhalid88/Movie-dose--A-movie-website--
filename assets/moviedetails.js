const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "5608062d25639e60cc83e9d4e78d7066"; 

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
    fetchMovieDetails(movieId);
    fetchMovieCast(movieId);
}

async function fetchMovieDetails(id) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const movie = await response.json();

        document.getElementById("movie-poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById("movie-title").textContent = movie.title;
        document.getElementById("movie-plot").textContent = movie.overview;
        document.getElementById("movie-rating").textContent = movie.vote_average.toFixed(1);
        document.getElementById("movie-release").textContent = movie.release_date;
    } catch (error) {
        console.error("Error");
    }
}

async function fetchMovieCast(id) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const data = await response.json();
        const castList = document.getElementById("movie-cast");
        castList.innerHTML = ""; 

        data.cast.slice(0, 5).forEach(actor => {
            const li = document.createElement("li");
            li.classList.add("cast-item");
            if (actor.profile_path) {
                const img = document.createElement("img");
                img.src = `https://image.tmdb.org/t/p/w185${actor.profile_path}`;
                img.alt = actor.name;
                li.appendChild(img);
            }
            const name = document.createElement("p");
            name.textContent = actor.name;
            li.appendChild(name);
            castList.appendChild(li);
        });
        
    } catch (error) {
        console.error("Error");
        document.getElementById("movie-cast").innerHTML = "<li>No cast information available.</li>";
    }
}

//localStorage
document.getElementById("watchlist-btn").addEventListener("click", function() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Movie added to watchlist!");
    } else {
        alert("Movie is already in your watchlist.");
    }
});

