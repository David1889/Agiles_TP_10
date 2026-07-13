import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado - Teclado en pantalla", () => {
  it("indica si una letra está disponible antes y después de usarla", () => {
    const juego = new Ahorcado("CASA");

    expect(juego.letraDisponible("A")).toBe(true);

    juego.adivinar("A");

    expect(juego.letraDisponible("A")).toBe(false);
    expect(juego.letraDisponible("B")).toBe(true);
  });
});
