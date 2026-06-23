export class Ahorcado {
  private palabra: string;
  private intentos: number;

  constructor(palabra: string) {
    this.palabra = palabra;
    this.intentos = 6;
  }

  palabraEnmascarada(): string {
    return this.palabra.split("").map(() => "_").join(" ");
  }

  vidas(): number {
    return this.intentos;
  }
}
