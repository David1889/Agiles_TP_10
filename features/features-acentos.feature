# language: es

Característica: Soporte de acentos

  Escenario: El jugador acierta una vocal acentuada
    Dado una partida con la palabra "CAMIÓN"
    Cuando el jugador adivina la letra "O"
    Entonces se ve la palabra "_ _ _ _ Ó _"
    Y se ven 6 vidas

  Escenario: La letra N no revela la Ñ
    Dado una partida con la palabra "AÑO"
    Cuando el jugador adivina la letra "N"
    Entonces se ve la palabra "_ _ _"
    Y se ven 5 vidas

  Escenario: El jugador acierta la letra Ñ
    Dado una partida con la palabra "AÑO"
    Cuando el jugador adivina la letra "Ñ"
    Entonces se ve la palabra "_ Ñ _"
    Y se ven 6 vidas