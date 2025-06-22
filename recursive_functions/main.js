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

  // async function getRMCharacters(url) {
  //   const request = await fetch(
  //     url ?? "https://rickandmortyapi.com/api/character",
  //   );
  //   const parsedResponse = await request.json();
  //   const nextPage = parsedResponse?.info?.next;
  //   const characters = parsedResponse?.results;
  //   return { characters, nextPage };
  // }

  // getRMCharacters().then(({ characters, nextPage }) => {
  //   characters.forEach((character) => {
  //     renderListItem(character);
  //   });
  //
  //   if (Boolean(nextPage)) {
  //     getRMCharacters(nextPage).then(({ characters, nextPage }) => {
  //       characters.forEach((character) => renderListItem(character));
  //
  //       if (Boolean(nextPage)) {
  //         // ...etc
  //       }
  //     });
  //   }

  async function getRMCharactersRecursively(
    characters = [],
    nextPageUrl = "https://rickandmortyapi.com/api/character",
  ) {
    if (!nextPageUrl) return characters;

    const request = await fetch(nextPageUrl);
    const parsedResponse = await request.json();

    const nextPage = parsedResponse?.info?.next;
    return getRMCharactersRecursively(
      [...characters, ...(parsedResponse?.results || [])],
      nextPage,
    );
  }

  getRMCharactersRecursively().then((characters) => {
    characters.forEach((character) => {
      renderListItem(character);
    });
  });
});
