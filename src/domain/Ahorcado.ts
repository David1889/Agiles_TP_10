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

    if (this.letrasAdivinadas.has(letraMayuscula)) return;

    this.letrasAdivinadas.add(letraMayuscula);

    if (!this.palabra.includes(letraMayuscula)) {
      this.intentos--;
    }
  }

  fueIntentada(letra: string): boolean {
    return this.letrasAdivinadas.has(letra.toUpperCase());
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

  haPerdido(): boolean {
    return this.intentos === 0;
  }

  palabraRevelada(): string {
    return this.palabra.split("").join(" ");
  }
}
