import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("inicializa con la palabra enmascarada y 6 vidas", () => {
    const juego = new Ahorcado("CASA");

    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
    expect(juego.vidas()).toBe(6);
  });

  it("revela todas las ocurrencias de una letra acertada sin restar vidas", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("A");

    expect(juego.palabraEnmascarada()).toBe("_ A _ A");
    expect(juego.vidas()).toBe(6);
  });

  it("es case-insensitive al adivinar letras", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("a");

    expect(juego.palabraEnmascarada()).toBe("_ A _ A");
    expect(juego.vidas()).toBe(6);
  });

  it("descuenta una vida cuando la letra no pertenece a la palabra", () => {
  const juego = new Ahorcado("CASA");

  juego.adivinar("E");

  expect(juego.vidas()).toBe(5);
});

  it("no ha ganado al inicio", () => {
    const juego = new Ahorcado("SOL");
    expect(juego.haGanado()).toBe(false);
  });

  it("no ha ganado si quedan letras sin adivinar", () => {
    const juego = new Ahorcado("SOL");
    juego.adivinar("S");
    juego.adivinar("O");
    expect(juego.haGanado()).toBe(false);
  });

  it("ha ganado al adivinar todas las letras", () => {
    const juego = new Ahorcado("SOL");
    juego.adivinar("S");
    juego.adivinar("O");
    juego.adivinar("L");
    expect(juego.haGanado()).toBe(true);
  });

  it("no ha perdido al inicio", () => {
    const juego = new Ahorcado("SOL");
    expect(juego.haPerdido()).toBe(false);
  });

  it("no ha perdido si todavía quedan vidas", () => {
    const juego = new Ahorcado("SOL");
    juego.adivinar("B");
    juego.adivinar("C");
    expect(juego.haPerdido()).toBe(false);
  });

  it("ha perdido al agotar las 6 vidas", () => {
    const juego = new Ahorcado("SOL");
    "BCDFGH".split("").forEach((letra) => juego.adivinar(letra));
    expect(juego.haPerdido()).toBe(true);
  });

  it("revela la palabra completa", () => {
    const juego = new Ahorcado("SOL");
    expect(juego.palabraRevelada()).toBe("S O L");
  });
});
