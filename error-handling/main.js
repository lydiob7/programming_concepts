function renderMessageOnScreen(message) {
  const rootElement = document.querySelector("#app");

  if (!!rootElement) {
    const normalHeadingElement = document.createElement("h2");
    normalHeadingElement.innerText = message ?? "";
    rootElement.appendChild(normalHeadingElement);
  }
}

function renderErrorOnScreen(errorMessage) {
  const rootElement = document.querySelector("#app");

  if (!!rootElement) {
    const errorHeadingElement = document.createElement("h2");
    errorHeadingElement.innerText = errorMessage ?? "";
    errorHeadingElement.classList.add("error-message");
    rootElement.appendChild(errorHeadingElement);
  }
}

function throwASimpleError() {
  throw "Algo salió mal";
}

function throwJSError() {
  throw Error("Algo salió mal");
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function throwCustomError() {
  if (Math.random() > 0.5) throw new ValidationError("Dato inválido");
}

function tryCatch(fn) {
  try {
    const data = fn();
    return [data, null];
  } catch (err) {
    return [null, err instanceof ValidationError ? err.message : String(err)];
  }
}

async function tryCatchAsync(fn) {
  try {
    const data = await fn();
    return [data, null];
  } catch (err) {
    return [null, err instanceof ValidationError ? err.message : String(err)];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  async function thisMayThrow() {
    // throwASimpleError();
    // throwJSError();
    try {
      // throwCustomError();
      // variableNoDefinida;
      // const [data, error] = tryCatch(throwCustomError);
      // if (data) {
      //   renderMessageOnScreen(data);
      // } else {
      //   renderErrorOnScreen(error);
      // }

      const [data, error] = await tryCatchAsync(async () => {
        const response = await fetch("https://dummyjson.com/users/1");

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        return response.json();
      });
      if (data) {
        renderMessageOnScreen(`${data?.firstName} ${data?.lastName}`);
      } else {
        renderErrorOnScreen(error);
      }
    } catch (error) {
      if (error instanceof ValidationError) renderErrorOnScreen(error.message);
      else renderErrorOnScreen("Error inesperado");
    } finally {
      renderMessageOnScreen("Esto se renderiza de cualquier manera");
    }

    renderMessageOnScreen("La app continúa en esta línea");
  }

  thisMayThrow();
});
