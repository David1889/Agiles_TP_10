export class Ahorcado {
  private static readonly VIDAS_INICIALES = 6;
  private static readonly ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  private static readonly ORDEN_PARTES = [
    "cabeza",
    "cuerpo",
    "brazo-izquierdo",
    "brazo-derecho",
    "pierna-izquierda",
    "pierna-derecha",
  ];
  static readonly PALABRAS_POR_DEFECTO = [
  "CASA",
  "GATO",
  "SOL",
  "PERRO",
  "AVION",
  "ARBOL",
  "FLOR",
  "LUNA",
  "NUBE",
  "RATON",
  "CAMIÓN",
  "AÑO",
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
  if (!this.esLetraValida(letra) || this.juegoTerminado()) {
    return;
  }

  const letraNormalizada = this.normalizar(letra);

  if (this.letrasAdivinadas.has(letraNormalizada)) {
    return;
  }

  this.letrasAdivinadas.add(letraNormalizada);

  const pertenece = this.palabra
    .split("")
    .some((caracter) => this.normalizar(caracter) === letraNormalizada);

  if (!pertenece) {
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
  return this.letrasAdivinadas.has(this.normalizar(letra));
}

  letrasDisponibles(): string[] {
    return Ahorcado.ALFABETO.filter((letra) => !this.fueIntentada(letra));
  }

  palabraEnmascarada(): string {
  return this.palabra
    .split("")
    .map((caracter) =>
      this.letrasAdivinadas.has(this.normalizar(caracter)) ? caracter : "_"
    )
    .join(" ");
}

  vidas(): number {
    return this.intentos;
  }

  haGanado(): boolean {
  return this.palabra
    .split("")
    .every((letra) => this.letrasAdivinadas.has(this.normalizar(letra)));
}

  haPerdido(): boolean {
    return this.intentos === 0;
  }

  palabraRevelada(): string {
    return this.palabra.split("").join(" ");
  }

  partesVisibles(): string[] {
    const errores = Ahorcado.VIDAS_INICIALES - this.intentos;
    return ["horca", ...Ahorcado.ORDEN_PARTES.slice(0, errores)];
  }

  private normalizar(letra: string): string {
  return letra
    .toUpperCase()
    .replace(/Ñ/g, "#")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/#/g, "Ñ");
}

}
