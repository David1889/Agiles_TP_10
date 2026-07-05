# language: es
Característica: Palabra al azar de una lista

  Escenario: Con semilla 0 elige la primera palabra
    Dado una partida con la lista "SOL,RELOJ,AVION" y semilla "0"
    Cuando la página arranca
    Entonces se ve la palabra "_ _ _"
    Y se ven 6 vidas

  Escenario: Con semilla 1 elige la segunda palabra
    Dado una partida con la lista "SOL,RELOJ,AVION" y semilla "1"
    Cuando la página arranca
    Entonces se ve la palabra "_ _ _ _ _"
    Y se ven 6 vidas

  Escenario: Con semilla 2 elige la tercera palabra
    Dado una partida con la lista "SOL,RELOJ,AVION" y semilla "2"
    Cuando la página arranca
    Entonces se ve la palabra "_ _ _ _ _"
    Y se ven 6 vidas
