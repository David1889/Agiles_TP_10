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
});
