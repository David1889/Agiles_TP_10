export class Ahorcado {
  private static readonly VIDAS_INICIALES = 6;
  private readonly palabra: string;
  private intentos: number;
  private letrasAdivinadas: Set<string>;

  constructor(palabra: string) {
    this.palabra = palabra.toUpperCase();
    this.intentos = Ahorcado.VIDAS_INICIALES;
    this.letrasAdivinadas = new Set();
  }

  adivinar(letra: string): void {
    const letraMayuscula = letra.toUpperCase();

    this.letrasAdivinadas.add(letraMayuscula);

    if (!this.palabra.includes(letraMayuscula)) {
      this.intentos--;
    }
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((caracter) =>
        this.letrasAdivinadas.has(caracter) ? caracter : "_"
      )
      .join(" ");
  }

  vidas(): number {
    return this.intentos;
  }

  haGanado(): boolean {
    return this.palabra
      .split("")
      .every((letra) => this.letrasAdivinadas.has(letra));
  }
}
