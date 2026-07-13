# language: es
Característica: Teclado en pantalla

  Escenario: Las letras usadas se marcan como no disponibles
    Dado una partida con la palabra "CASA"
    Cuando la página arranca
    Entonces se muestra un teclado con las letras del alfabeto
    Y la letra "A" está disponible
    Cuando el jugador adivina la letra "A"
    Entonces la letra "A" está marcada como no disponible
    Y la letra "B" está disponible
