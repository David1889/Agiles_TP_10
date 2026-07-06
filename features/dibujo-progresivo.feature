# language: es
Característica: Dibujo progresivo del ahorcado

Esquema del escenario: El muñeco se dibuja parte por parte con cada fallo
  Dado una partida con la palabra "GATO"
  Cuando el jugador falla <fallos> letras
  Entonces se ven las partes "<partes>" del muñeco

  Ejemplos:
    | fallos | partes                                                                                |
    | 0      | horca                                                                                 |
    | 1      | horca, cabeza                                                                         |
    | 2      | horca, cabeza, cuerpo                                                                 |
    | 3      | horca, cabeza, cuerpo, brazo-izquierdo                                                |
    | 4      | horca, cabeza, cuerpo, brazo-izquierdo, brazo-derecho                                 |
    | 5      | horca, cabeza, cuerpo, brazo-izquierdo, brazo-derecho, pierna-izquierda               |
    | 6      | horca, cabeza, cuerpo, brazo-izquierdo, brazo-derecho, pierna-izquierda, pierna-derecha |
