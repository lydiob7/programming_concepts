document.addEventListener("DOMContentLoaded", () => {
  /* ================ Funcion para mostrar los resultados en el DOM ======== */
  function renderListItem(character) {
    if (!character) return;

    let listElement = document.querySelector(".main-list");

    if (!listElement) {
      listElement = document.createElement("ul");
      listElement.classList.add("main-list");
      document.body.appendChild(listElement);
    }

    const listItemElement = document.createElement("li");

    const characterImageElement = document.createElement("img");
    characterImageElement.setAttribute("src", character.image);
    characterImageElement.setAttribute("alt", character.name);
    listItemElement.appendChild(characterImageElement);

    const characterNameElement = document.createElement("h2");
    characterNameElement.innerText = character.name || "";
    listItemElement.appendChild(characterNameElement);

    listElement.appendChild(listItemElement);
  }

  async function getRMCharacters() {
    const request = await fetch("https://rickandmortyapi.com/api/character");
    const parsedResponse = await request.json();
    const nextPage = parsedResponse?.info?.next;
    const characters = parsedResponse?.results;
    return { characters, nextPage };
  }

  getRMCharacters().then(({ characters, nextPage }) => {
    console.log(nextPage);
    characters.forEach((character) => {
      renderListItem(character);
    });
  });
});
