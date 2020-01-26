console.log('yaay')
document.querySelector('.btn-show').addEventListener('click', () => {
    // const url = "http://localhost:4000/"
    // // const url = "./business/quotes.js"
    // fetch(url, {mode: 'no-cors'}).then(response => console.log(response) );
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
      console.log(html)
      document.querySelector('.container').innerHTML = html
  });

  


})