import { Ahorcado } from "../domain/Ahorcado";
import "./styles.css";

const root = document.getElementById("app");

function readWordFromQuery(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("word") || "CASA";
}

if (root) {
  root.innerHTML = `
    <main class="game">
      <header class="game__header">
        <h1 class="game__title">Ahorcado</h1>
      </header>

      <section class="board">
        <div class="word" data-testid="word">_ _ _ _</div>

        <div class="lives">
          <span class="lives__label">Vidas</span>
          <span class="lives__count" data-testid="lives">6</span>
        </div>

        <div class="message" data-testid="message"></div>

        <div class="controls">
          <input
            class="guess"
            type="text"
            id="guess-input"
            placeholder="Letra"
            autocomplete="off"
            aria-label="Adivinar una letra"
          />
          <p class="hint">Escribí una letra y presioná Enter</p>
        </div>
      </section>
    </main>
  `;

  const palabra = readWordFromQuery();
  const juego = new Ahorcado(palabra);

  const wordEl = root.querySelector("[data-testid=word]") as HTMLElement;
  const livesEl = root.querySelector("[data-testid=lives]") as HTMLElement;
  const messageEl = root.querySelector("[data-testid=message]") as HTMLElement;
  const input = root.querySelector("#guess-input") as HTMLInputElement;

  function render() {
    if (wordEl) wordEl.textContent = juego.palabraEnmascarada();
    if (livesEl) livesEl.textContent = String(juego.vidas());
    if (juego.haGanado()) {
      if (messageEl) messageEl.textContent = "GANASTE";
      input.disabled = true;
    } else if (juego.haPerdido()) {
      if (messageEl) messageEl.textContent = "PERDISTE";
      if (wordEl) wordEl.textContent = juego.palabraRevelada();
      input.disabled = true;
    } else {
      if (messageEl) messageEl.textContent = "";
    }
  }

  // initial render
  render();

  // when user presses Enter, submit the letter to domain and re-render
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const letra = input.value.trim();
      if (letra.length > 0) {
        if (!juego.esLetraValida(letra)) {
          if (messageEl) messageEl.textContent = "Entrada inválida";
        } else if (juego.fueIntentada(letra)) {
          if (messageEl) messageEl.textContent = "Ya intentaste esa letra";
        } else {
          juego.adivinar(letra);
          input.value = "";
          render();
        }
      }
    }
  });
}
