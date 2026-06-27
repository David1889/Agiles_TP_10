export class Ahorcado {
  private palabra: string;
  private intentos: number;
  private letrasAdivinadas: Set<string>;

  constructor(palabra: string) {
    this.palabra = palabra;
    this.intentos = 6;
    this.letrasAdivinadas = new Set();
  }

  adivinar(letra: string): void {
    const letraMayuscula = letra.toUpperCase();

    this.letrasAdivinadas.add(letraMayuscula);

    if (!this.palabra.toUpperCase().includes(letraMayuscula)) {
      this.intentos--;
    }
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((caracter) =>
        this.letrasAdivinadas.has(caracter.toUpperCase()) ? caracter : "_"
      )
      .join(" ");
  }

  vidas(): number {
    return this.intentos;
  }

  haGanado(): boolean {
    return this.palabra
      .split("")
      .every((letra) => this.letrasAdivinadas.has(letra.toUpperCase()));
  }
}
