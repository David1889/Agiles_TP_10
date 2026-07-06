import { Ahorcado } from "../domain/Ahorcado";
import "./styles.css";

const root = document.getElementById("app");

function crearJuegoDesdeQuery(): Ahorcado {
  const params = new URLSearchParams(window.location.search);

  const wordsParam = params.get("words");
  if (wordsParam) {
    const lista = wordsParam.split(",").map((w) => w.trim());
    const seed = parseInt(params.get("seed") ?? "0", 10);
    return new Ahorcado(lista, seed);
  }

  const wordParam = params.get("word");
  return new Ahorcado(wordParam || "CASA");
}

if (root) {
  root.innerHTML = `
    <main class="game">
      <header class="game__header">
        <h1 class="game__title">Ahorcado</h1>
      </header>

      <section class="board">
        <svg
          class="figure"
          data-testid="figure"
          viewBox="0 0 120 160"
          width="120"
          height="160"
          aria-hidden="true"
        ></svg>

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

  const juego = crearJuegoDesdeQuery();

  const TRAZOS_PARTES: Record<string, string> = {
    horca: `<g data-testid="parte-horca" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none">
      <line x1="10" y1="150" x2="90" y2="150" />
      <line x1="30" y1="150" x2="30" y2="10" />
      <line x1="30" y1="10" x2="80" y2="10" />
      <line x1="80" y1="10" x2="80" y2="30" />
    </g>`,
    cabeza: `<circle data-testid="parte-cabeza" cx="80" cy="40" r="10" stroke="currentColor" stroke-width="4" fill="none" />`,
    cuerpo: `<rect data-testid="parte-cuerpo" x="78" y="50" width="4" height="45" rx="2" fill="currentColor" />`,
    "brazo-izquierdo": `<line data-testid="parte-brazo-izquierdo" x1="80" y1="62" x2="66" y2="80" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
    "brazo-derecho": `<line data-testid="parte-brazo-derecho" x1="80" y1="62" x2="94" y2="80" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
    "pierna-izquierda": `<line data-testid="parte-pierna-izquierda" x1="80" y1="95" x2="68" y2="120" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
    "pierna-derecha": `<line data-testid="parte-pierna-derecha" x1="80" y1="95" x2="92" y2="120" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
  };

  const figureEl = root.querySelector("[data-testid=figure]") as SVGElement;
  const wordEl = root.querySelector("[data-testid=word]") as HTMLElement;
  const livesEl = root.querySelector("[data-testid=lives]") as HTMLElement;
  const messageEl = root.querySelector("[data-testid=message]") as HTMLElement;
  const input = root.querySelector("#guess-input") as HTMLInputElement;

  function render() {
    if (figureEl)
      figureEl.innerHTML = juego
        .partesVisibles()
        .map((parte) => TRAZOS_PARTES[parte] ?? "")
        .join("");
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
