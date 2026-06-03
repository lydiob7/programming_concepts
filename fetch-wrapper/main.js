function renderListItem(character) {
  if (!character) return;

  let listElement = document.querySelector(".main-list");

  if (!listElement) {
    listElement = document.createElement("ul");
    listElement.classList.add("main-list");
    document.body.appendChild(listElement);
  }

  const listItemElement = document.createElement("li");

  listItemElement.id = character.id;

  const characterNameElement = document.createElement("h2");
  characterNameElement.innerText = character.name || "";
  listItemElement.appendChild(characterNameElement);

  if (!!character?.portrait_path?.trim()?.length) {
    const characterImageElement = document.createElement("img");
    characterImageElement.src = `https://cdn.thesimpsonsapi.com/200${character.portrait_path}`;
    characterImageElement.alt = character.name;
    listItemElement.appendChild(characterImageElement);
  }

  listElement.appendChild(listItemElement);
}

async function getCharacters() {
  const request = await fetch("https://thesimpsonsapi.com/api/characters");
  const parsedResponse = await request.json();
  const characters = parsedResponse?.results;
  return { characters };
}

document.addEventListener("DOMContentLoaded", () => {
  getCharacters().then(({ characters }) => {
    characters.forEach((character) => {
      renderListItem(character);
    });
  });
});
