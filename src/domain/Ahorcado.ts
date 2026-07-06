export class Ahorcado {
  private static readonly VIDAS_INICIALES = 6;
  static readonly PALABRAS_POR_DEFECTO = [
    "CASA", "GATO", "SOL", "PERRO", "AVION",
    "ARBOL", "FLOR", "LUNA", "NUBE", "RATON",
  ];
  private readonly palabra: string;
  private intentos: number;
  private letrasAdivinadas: Set<string>;

  constructor(palabra: string);
  constructor(palabras: string[], seed: number);
  constructor(palabraOLista: string | string[], seed?: number) {
    if (typeof palabraOLista === "string") {
      this.palabra = palabraOLista.toUpperCase();
    } else {
      const lista = palabraOLista.length > 0 ? palabraOLista : Ahorcado.PALABRAS_POR_DEFECTO;
      this.palabra = Ahorcado.seleccionarPalabra(lista, seed ?? 0).toUpperCase();
    }
    this.intentos = Ahorcado.VIDAS_INICIALES;
    this.letrasAdivinadas = new Set();
  }

  private static seleccionarPalabra(lista: string[], seed: number): string {
    const index = ((seed * 2654435761) >>> 0) % lista.length;
    return lista[index];
  }

  adivinar(letra: string): void {
    if (this.juegoTerminado()) return;
    if (!this.esLetraValida(letra)) return;

    const letraMayuscula = letra.toUpperCase();

    if (this.letrasAdivinadas.has(letraMayuscula)) return;

    this.letrasAdivinadas.add(letraMayuscula);

    if (!this.palabra.includes(letraMayuscula)) {
      this.intentos--;
    }
  }

  esLetraValida(letra: string): boolean {
    return /^[a-zñ]$/i.test(letra);
  }

  juegoTerminado(): boolean {
    return this.haGanado() || this.haPerdido();
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

  partesVisibles(): string[] {
    return ["horca"];
  }
}
