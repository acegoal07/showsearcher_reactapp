const fetchSettings = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk4MTAxNjk0OTQ2MmE4NmJlNTA2NTc2Yjg1ZjZlNCIsInN1YiI6IjY2MjFkMDY1Y2NkZTA0MDE4ODA2NDA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUExDZr1UbIizmXNPNqotICIYYKTQfRltq2uIgq9qjI',
  },
};

/**
 * Search for shows based on the search term and show type
 * @param {string} query The search term
 * @param {string} showType The type of show to search for
 * @param {React.Dispatch<React.SetStateAction<string>>} setSearchTerm The state setter for the search term
 * @param {React.Dispatch<React.SetStateAction<never[]>>} setSearchResults The state setter for the search results
 */
export function searchForShows(
  query: string,
  showType: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<never[]>>
) {
  setSearchTerm(query);
  if (query.length < 1) {
    setSearchResults([]);
    return;
  }
  fetch(
    showType === 'movie'
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&page=1`
      : `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&page=1`,
    fetchSettings
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then((data) => {
      setSearchResults(data.results || []);
    })
    .catch((error) => console.error(error));
}

/**
 * Get the genre names for a show
 * @param {string} showType The type of show to search for
 * @param {Array} genre_ids The genre ids for the show
 * @param setGenreData The state setter for the genre data
 */
export function convertGenreIdsToNames(
  showType: string,
  genre_ids: [],
  setGenreData: React.Dispatch<React.SetStateAction<string>>
) {
  fetch(
    showType === 'movie'
      ? `https://api.themoviedb.org/3/genre/movie/list?language=en`
      : `https://api.themoviedb.org/3/genre/tv/list?language=en`,
    fetchSettings
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      } else {
        return res.json();
      }
    })
    .then((genreData) => {
      const genres: any[] = [];
      genre_ids.forEach((genreId: any) => {
        const returnGenre = genreData.genres.find((e: { id: any }) => e.id === genreId);
        if (returnGenre) {
          genres.push(returnGenre.name);
        }
      });
      setGenreData(genres.join(', '));
    })
    .catch((error) => console.error(error));
}
