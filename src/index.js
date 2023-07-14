let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Using this to complete the challenges of this lab.
  const toyForm = document.querySelector('.add-toy-form');
  const toyCollection = document.getElementById('toy-collection');

  // Challenge 1: Fetch and render toys
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => renderToy(toy));
    });

  // Challenge 2: Add new toy
  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const likes = 0;

    const newToy = { name, image, likes };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newToy),
    })
      .then(response => response.json())
      .then(toy => {
        renderToy(toy);
        toyForm.reset();
      });
  });

  // Challenge 3: Like a toy
  toyCollection.addEventListener('click', event => {
    if (event.target.classList.contains('like-btn')) {
      const toyId = event.target.id;
      const likesElement = event.target.previousElementSibling;
      let likes = parseInt(likesElement.textContent.split(' ')[0]);
      likes++;

      const updatedToy = { likes };

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updatedToy),
      })
        .then(response => response.json())
        .then(updatedToy => {
          likesElement.textContent = `${updatedToy.likes} Likes`;
        });
    }
  });

  // Helper function to render a toy card
  function renderToy(toy) {
    const card = document.createElement('div');
    card.className = 'card';

    const nameElement = document.createElement('h2');
    nameElement.textContent = toy.name;

    const imageElement = document.createElement('img');
    imageElement.src = toy.image;
    imageElement.className = 'toy-avatar';

    const likesElement = document.createElement('p');
    likesElement.textContent = `${toy.likes} Likes`;

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;
    likeBtn.textContent = 'Like ❤️';

    card.append(nameElement, imageElement, likesElement, likeBtn);
    toyCollection.appendChild(card);
  }
});

