# language: es
Característica: Teclado en pantalla

  Escenario: Las letras usadas quedan marcadas como acertadas o incorrectas
    Dado una partida con la palabra "CASA"
    Cuando el jugador usa el teclado en pantalla para la letra "A"
    Y el jugador usa el teclado en pantalla para la letra "E"
    Entonces la letra "A" se muestra como acertada
    Y la letra "E" se muestra como fallada
