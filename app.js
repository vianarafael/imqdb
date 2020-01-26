
// update the UI with data from db
function updateUI() {
    let movies
  
    fetch('http://localhost:4000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ quotes { id quote movie year } }' }),
})
  .then(res => res.json())
  .then(res => movies = res.data.quotes)
  .then(movies => {
      let html = ''
      movies.forEach(movie => {
          html += `<p id="${movie.id}">${movie.quote} ${movie.movie}, ${movie.year} <button class="btn-delete">Delete</button><button class="btn-edit">Edit</button></p>`
      })
      document.querySelector('.container').innerHTML = html
  });

}


document.querySelector('.btn-show').addEventListener('click',updateUI)

document.querySelector('.add-form__btn').addEventListener('click', (e) => {
  e.preventDefault()
  const quote = document.querySelector(".add-form__input-quote").value
  const movie = document.querySelector(".add-form__input-movie").value
  const year = document.querySelector(".add-form__input-year").value
  console.log(quote, movie, year)
  const mutation =  `
  mutation {
    addQuote(quote: "${quote}", movie: "${movie}", year: "${year}") {
      quote
      movie
      year
    }
  }
`;

  fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation }),
  })
  .then(res => res.json())
  .then(res => updateUI())
})


