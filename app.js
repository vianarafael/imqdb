
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
          html += `<div class="quote" id="${movie.id}"><p>${movie.quote} ${movie.movie}, ${movie.year} <button class="btn-delete">Delete</button><button class="btn-edit">Edit</button></p><input type="text" class="input-quote invisible" placeholder="Quote"><input type="text" class="input-movie invisible" placeholder="Movie"><input type="text" class="input-year invisible" placeholder="Year"><button class="change invisible">Change</button></div>`
      })
      document.querySelector('.container').innerHTML = html
  });

}

function makeVisible(node) {
  while ( node ) {
    console.log(node)
    if (node.nodeType === Node.ELEMENT_NODE ) {
      if (node.classList.contains("invisible")) {
           node.classList.remove("invisible")
           node.classList.add("visible")
        }
    }


    node = node.nextElementSibling || node.nextSibling;
  }
}

function deleteOrEdit(event) {
  //delete
  const element = event.target;
  if (element.classList.contains("btn-delete")){
      const id = element.parentElement.parentElement.id
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

  // edit part 1
  if (element.classList.contains("btn-edit")) {
    let node = element.parentNode.parentNode.firstChild;

    makeVisible(node)
    const id = element.parentElement.id
  }

  // edit part 2
  if (element.classList.contains("change")) {
    const id = element.parentNode.id
    let quote, movie, year
    let node = document.getElementById(id).firstChild
    while ( node ) {
      if ( node !== this && node.nodeType === Node.ELEMENT_NODE ) {
        // get the values
        if (node.classList.contains("input-quote")) {
          quote = node.value
        }
        if (node.classList.contains("input-movie")) {
          movie = node.value
        }
        if (node.classList.contains("input-year")) {
          year = node.value
        }
        // make the edit menu disapear
        if (node.classList.contains("visible")) {
          node.classList.remove("visible")
          node.classList.add("invisible")
        }
      }

      node = node.nextElementSibling || node.nextSibling;
    }

    // edit part 3
    console.log(quote, movie, year)
    const mutation =  `
    mutation {
      editQuote(id: ${id}, quote: "${quote}", movie: "${movie}", year: "${year}") {
        id
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
  .then(() => {
    updateUI()
    document.querySelector(".add-form").classList.add('invisible')})
})


document.addEventListener("click", deleteOrEdit)

document.querySelector('.btn-add').addEventListener('click', (e) => {
  const node = e.target.parentNode.firstChild
  makeVisible(node)
})