
let sviFilmovi = []; 


fetch('filmovi.csv')
  .then(response => response.text())
  .then(csvText => {
    const rezultat = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    sviFilmovi = rezultat.data.map(film => ({
      title: film.title,
      year: Number(film.year),
      genre: film.genre,
      duration: Number(film.duration),
      rating: Number(film.avg_vote)
    }));

    prikaziFilmove(sviFilmovi);
  })
  .catch(error => {
    console.error('Greška pri dohvaćanju CSV-a:', error);
  });


function prikaziFilmove(filmovi) {
  const tbody = document.querySelector('#filmovi-tablica tbody');
  tbody.innerHTML = '';

  for (const film of filmovi) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.year}</td>
      <td>${film.genre}</td>
      <td>${film.duration}</td>
      <td>${film.rating}</td>
    `;
    tbody.appendChild(row);
  }
}


const rangeInput = document.getElementById('filter-rating');
const ratingDisplay = document.getElementById('rating-value');
rangeInput.addEventListener('input', () => {
  ratingDisplay.textContent = rangeInput.value;
});


document.getElementById('primijeni-filtere').addEventListener('click', () => {
  const odabraniZanr = document.getElementById('filter-genre').value;
  const godinaOd = document.getElementById('filter-year').value;
  const ocjenaMin = document.getElementById('filter-rating').value;

  const filtriraniFilmovi = sviFilmovi.filter(film => {
    const zanrMatch = !odabraniZanr || film.genre.includes(odabraniZanr);
    const godinaMatch = !godinaOd || film.year >= godinaOd;
    const ocjenaMatch = film.rating >= ocjenaMin;
    return zanrMatch && godinaMatch && ocjenaMatch;
  });

  prikaziFilmove(filtriraniFilmovi);
});