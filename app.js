
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
          html += `<p id="${movie.id}">${movie.quote} ${movie.movie}, ${movie.year} <button class="btn-delete">Delete</button><button class="btn-edit">Edit</button></p><input type="text" class="add-form__input-quote invisible" placeholder="Quote"><input type="text" class="add-form__input-movie invisible" placeholder="Movie"><input type="text" class="add-form__input-year invisible" placeholder="Year">`
      })
      document.querySelector('.container').innerHTML = html
  });

}

function deleteOrEdit(event) {
  const element = event.target;
  if (element.classList.contains("btn-delete")){
      const id = element.parentElement.id
      const mutation =  `
      mutation {
        deleteQuote(id: "${id}") {
          ok
        }
      }
    `;
    
      fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      })
      .then(res => res.json())
      .then(() => updateUI())
  }
  if (element.classList.contains("btn-edit")) {
    console.log("editing")
  }
}


document.querySelector('.btn-show').addEventListener('click',updateUI)

document.querySelector('.add-form__btn').addEventListener('click', (e) => {
  e.preventDefault()
  const quote = document.querySelector(".add-form__input-quote").value
  const movie = document.querySelector(".add-form__input-movie").value
  const year = document.querySelector(".add-form__input-year").value
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
  .then(() => updateUI())
})


document.addEventListener("click", deleteOrEdit)