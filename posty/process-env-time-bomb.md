https://massimilianomirra.com/notes/the-frontend-process-env-time-bomb-plus-a-sustainable-definition-of-fixed

problem z process env jest taki ze pozostawione w kodzie zupelnie nam nie mowi dlaxzeog aplowkcja padla

np. 
uzywamy process env jako adres srodowiska w request
ktos zapokni ustwiec sobie zmienna srodowiskowa to dostanie blad requestu bez wiekszej podpowiedzi braku zmiennej srodowiskowej

zmienne srodowiskowe moga pasc dopiero na produkcji bo beszie ich brakowac

problem jest tez opieranie sie na pamieci programsity ktory ma pamietac aby dodac zmienna srodowiksowa
to zawodzi 

rozwiazaniem jest zcentralizowanie zmiennych pod jedna klasa
traktownaie ich jako zmiennych z zewnatrz, walidowac
rzucac jasnym wyjatkiem jesli brakuje takiej zmiennej 

mozna to potem udatownic tez poprzez context dla kliencikich komponnetow 

warto dodac skrypt do CI/CD ktory bedzie walidowal zmienne przed momentem buildu, tak aby wylapac brakiem zmiennej przed deploy

dobrze jest dodac eslint rule ktora plinije reguly
'''
{
  "rules": {
    "no-process-env": "error"
  }
}
'''