Pseudokode for funksjonen riktig:

Funksjon riktig
    Inn:
        - index, et number som sier hvilket spørsmål som var riktig
    Ut:
        - ingenting

    Sett lyd på pause
    Fjern instrument nr. index fra listen instrumenter
    Spill lydRett
    Sett antallGjett til 0
    Kjør funksjon nyttInstrument
    Hvis lengden av instrumenter er større enn 0:
        Kjør funksjon lagHTML
    Ellers:
        Kjør funksjon lagSluttskjerm
    Funksjon slutt
