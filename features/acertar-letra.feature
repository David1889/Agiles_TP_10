# language: es
Característica: Acertar letra

  Escenario: El jugador acierta una letra en la palabra
    Dado una partida con la palabra "CASA"
    Cuando el jugador adivina la letra "A"
    Entonces se ve la palabra "_ A _ A"
    Y se ven 6 vidas
