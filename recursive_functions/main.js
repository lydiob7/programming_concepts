document.addEventListener("DOMContentLoaded", () => {
  /* ================ Función para mostrar los resultados en el DOM ======== */
  function renderListItem(character) {
    if (!character) return;

    let listElement = document.querySelector(".main-list");

    if (!listElement) {
      listElement = document.createElement("ul");
      listElement.classList.add("main-list");
      document.body.appendChild(listElement);
    }

    const listItemElement = document.createElement("li");

    const characterNameElement = document.createElement("h2");
    characterNameElement.innerText = character.name || "";
    listItemElement.appendChild(characterNameElement);

    listElement.appendChild(listItemElement);
  }

  /* ================ Función para hacer la petición a la api y devolver los resultados y la próxima página ============= */
  // async function getPokemons() {
  //   const request = await fetch("https://pokeapi.co/api/v2/pokemon");
  //   const parsedResponse = await request.json();
  //   const nextPage = parsedResponse?.next;
  //   const pokemons = parsedResponse?.results;
  //   return { pokemons, nextPage };
  // }

  /* ============== Función principal para mostrar los resultados ================== */
  // getPokemons().then(({ pokemons, nextPage }) => {
  //   pokemons.forEach((pokemon) => {
  //     renderListItem(pokemon);
  //   });
  //
  //   if (Boolean(nextPage)) {
  //     getPokemons(nextPage).then(({ pokemons, nextPage }) => {
  //       pokemons.forEach((pokemon) => renderListItem(pokemon));
  //
  //       if (Boolean(nextPage)) {
  //         // ...etc
  //       }
  //     });
  //   }
  // });

  /* ================ Función para hacer la petición a la api de forma recursiva ============= */

  let calls = 0;
  async function getPokemonsRecursively(
    pokemons = [],
    nextPageUrl = "https://pokeapi.co/api/v2/pokemon",
  ) {
    if (!nextPageUrl || calls >= 10) return pokemons;
    calls++;
    const request = await fetch(nextPageUrl);
    const parsedResponse = await request.json();
    const nextPage = parsedResponse?.next;
    const results = parsedResponse?.results || [];
    return getPokemonsRecursively([...pokemons, ...results], nextPage);
  }

  getPokemonsRecursively().then((pokemons) => {
    pokemons.forEach((pokemon) => renderListItem(pokemon));
  });
});
