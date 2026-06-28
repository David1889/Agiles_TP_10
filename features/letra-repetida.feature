# language: es
Característica: Letra repetida

  Escenario: Repetir una letra acertada no penaliza
    Dado una partida con la palabra "CASA"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la letra "A"
    Entonces se ve la palabra "_ A _ A"
    Y se ven 6 vidas

  Escenario: Repetir una letra fallada no vuelve a penalizar
    Dado una partida con la palabra "CASA"
    Cuando el jugador adivina la letra "X"
    Y el jugador adivina la letra "X"
    Entonces se ven 5 vidas
