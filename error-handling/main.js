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

document.addEventListener("DOMContentLoaded", () => {});
