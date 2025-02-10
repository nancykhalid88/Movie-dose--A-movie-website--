const BASE_URL = "https://api.themoviedb.org/3";
const trendingEndpoint = "/trending/movie/day";
const IncomingEndpoint = "/movie/upcoming";
const TopRatedEndpoint = "/movie/top_rated";
const FeatuedEndpoint = "/movie/now_playing";
const API_KEY = "?api_key=5608062d25639e60cc83e9d4e78d7066";

async function fetchMovies(endpoint,containerId) {
    try{
        const response=await fetch(`${BASE_URL}${endpoint}${API_KEY}`);
        const data=await response.json();
        displayMovies(data.results, containerId);
    }
    catch(error)
    {
        console.log ("Error")
    }
    
}

function displayMovies (movies,containerId){
    const movieContainer=document.getElementById(containerId);
    movieContainer.innerHTML="";
    movies.forEach(movie => {
        const movieElement=document.createElement("div");
        movieElement.classList.add("movie-card");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h5>${movie.title}</h5>
            <p> Rate: ${movie.vote_average.toFixed(1)}</p>
        `;
        movieElement.addEventListener("click", () => {
            window.location.href = `movieDetails.html?id=${movie.id}`;
        });

        movieContainer.appendChild(movieElement);
    });
}
document.querySelectorAll(".movie-wrapper").forEach(wrapper => {
    const movieContainer = wrapper.querySelector(".movie-container");
    const prevBtn = wrapper.querySelector(".prev-btn");
    const nextBtn = wrapper.querySelector(".next-btn");

    prevBtn.addEventListener("click", () => {
        movieContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        movieContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
});


fetchMovies(trendingEndpoint, "trending-movies");
fetchMovies(IncomingEndpoint, "upcoming-movies");
fetchMovies(TopRatedEndpoint, "top-rated-movies");
fetchMovies(FeatuedEndpoint, "featured-movies");

