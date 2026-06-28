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

  it("repetir una letra acertada no descuenta vidas", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("A");
    juego.adivinar("A");

    expect(juego.palabraEnmascarada()).toBe("_ A _ A");
    expect(juego.vidas()).toBe(6);
  });

  it("repetir una letra fallada no vuelve a descuental", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("X");
    juego.adivinar("X");

    expect(juego.vidas()).toBe(5);
  });

  it("fueIntentada devuelve true si la letra ya fue adivinada", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("A");

    expect(juego.fueIntentada("A")).toBe(true);
  });

  it("fueIntentada devuelve false si la letra no fue adivinada", () => {
    const juego = new Ahorcado("CASA");

    expect(juego.fueIntentada("A")).toBe(false);
  });

  it("esLetraValida es true para una sola letra", () => {
    const juego = new Ahorcado("CASA");
    expect(juego.esLetraValida("A")).toBe(true);
    expect(juego.esLetraValida("z")).toBe(true);
  });

  it("esLetraValida es false para algo que no es una sola letra", () => {
    const juego = new Ahorcado("CASA");
    expect(juego.esLetraValida("5")).toBe(false);
    expect(juego.esLetraValida("%")).toBe(false);
    expect(juego.esLetraValida("AB")).toBe(false);
    expect(juego.esLetraValida("")).toBe(false);
  });

  it("adivinar una entrada que no es letra no penaliza ni revela nada", () => {
    const juego = new Ahorcado("CASA");

    juego.adivinar("5");

    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
    expect(juego.vidas()).toBe(6);
  });

  it("juegoTerminado es false mientras la partida sigue", () => {
    const juego = new Ahorcado("SOL");
    expect(juego.juegoTerminado()).toBe(false);
  });

  it("juegoTerminado es true cuando se ganó", () => {
    const juego = new Ahorcado("SOL");
    "SOL".split("").forEach((letra) => juego.adivinar(letra));
    expect(juego.juegoTerminado()).toBe(true);
  });

  it("juegoTerminado es true cuando se perdió", () => {
    const juego = new Ahorcado("SOL");
    "BCDFGH".split("").forEach((letra) => juego.adivinar(letra));
    expect(juego.juegoTerminado()).toBe(true);
  });

  it("adivinar no cambia el estado si la partida ya terminó", () => {
    const juego = new Ahorcado("SOL");
    "SOL".split("").forEach((letra) => juego.adivinar(letra));

    juego.adivinar("X");

    expect(juego.vidas()).toBe(6);
    expect(juego.haGanado()).toBe(true);
  });
});
