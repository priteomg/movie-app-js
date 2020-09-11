const API_KEY = "17afcd74e67796016577244fdca52898";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=17afcd74e67796016577244fdca52898&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=17afcd74e67796016577244fdca52898&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const resData = await res.json();

  console.log(resData);

  showMovies(resData.results);
}

function showMovies(movies) {
  //clear main
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, vote_average, poster_path, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
       
                <img
                src="${IMG_PATH + poster_path}"
                alt="${title}"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(
                      vote_average
                    )}">${vote_average}</span>
                </div>
                <div class="overview">
                <h3>Overview:</h3>
                ${overview}
                </div>
      
                `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  }
});
