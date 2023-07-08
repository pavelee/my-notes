# Testy na froncie

## Cele testownia i semantyka

-   poprawnie działanie aplikacji - czy można wdrażać?
-   zaufanie - wiemy że nie padnie na produkcji
    -   jeżeli wiemy że gdzieś są problemy, przykryjmy to miejsce testami
-   testy chronią przed regresją
-   stablilność aplikacji (np. przykłady brzegowe)
-   stabilny i przewidywalny rozwój aplikacji
-   żywa dokumentacja - dopóki uruchaiamy testy, zawsze muszą być aktualne
-   testowalność (zazwyczaj) zwiększa czytelność i zmniejsza coupling
    -   kod nie testowany staje się ciężki do testowania (mniej czytelny, brudniejszy, przekomplikowany)

### Testy jednostkowe

-   testy: funkcje, klasy, przetarzanie danych, a także komponenty wizualne (jednostka, mały wycinek systemu)
-   działają na bardzo małym wycinku danych
-   niskopoziomowe
-   wartość: mówią że nie działa np. funkcja ale nie powiedzą jakie niesie to konsekwencje
-   szybkie!

### Testy integracyjne

-   integrują kilka elementów lub warstw
-   wartość: jeżeli zmienimy implementacje ale wynik nadal jest poprawny to nie musimy przerabiać testów integracyjnych. W przypadku jednostkowych byłoby to konieczne.
-   wartość: dzadzą nam znać że jakiś wycinek systemu nie działa, wiemy jakie niesie to konsekwencje
-   raczej szybkie, ale wolniejsze od jednostkowych.

### Testy jednostkowe/integracyjne komponentów UI

-   testy jednostowe testują atomowe zachowania
    -   kilknięcie buttona powoduje wywołane fn
    -   wstrzyknięcie props powoduje wyświetlenie tekstu
-   testy integracyjne - testowanie kilku/kilkudziesięciu komponentów razem - sprawdzany spójną całość

### Testy End-to-End (UI)

-   działają na całym systemie
-   wysokopoziomowe
-   bardzo wolne (nawet minuty np. 15 min)
-   wartość: dzadzą nam znać jeśli usługa biznesowa nie działa, ale nie powiedza dlaczego

### Piramida testów

https://martinfowler.com/bliki/TestPyramid.html

Dla frontu mamy pojęcie "Testing Trophy"

https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests

### Inne rodzaje testów

-   Somke-testy
    -   włączam, nic więcej, sprawdzam czy żyje
    -   tanie w utrzymaniu ale nie chronią funkcjonalności biznesowych
-   Testy regresyjne
    -   wszystkie testy są poniekąd regresyjne
    -   badają czy po zmianie kodu wystąpiła regresja
-   Testy akceptacyjne
    -   wszystkie testy są poniekąd akceptacyjne
    -   przechodzące testy akceptacyjne dają zielone światło do wdrożenia

## Watościowe testy

### FIRST

-   F - Fast
    -   powinny szybko działać, inaczej będą pomijane
-   I - Independent
    -   niezależne, przewidywalne, mogą działać samodzielnie
-   R - Repeatable
    -   powtarzalne, na każdym środowisku
-   S - Self-Validating
    -   jednoznaczny wynik, pass or fail
-   T - Timely
    -   Powinniśmy przemyśleć testy na samym początku, jak już zaimplementujemy to napisanie testów może być trudne, bo kod nie jest łatwy do testowania

### Dodatkowe wartościowe cechy

-   czytelne - patrze na test i wiem co się tam dzieje
-   mają precyzyjne testy - wiem które odpalić, wiem że się nachodzą testowanym obszarem
-   powinny współdzielić między sobą jak najmniej
-   są proste i nie zawierają logiki
-   sprawdzają tylko jedna rzecz, jak wybuchnie to wiem co jest nie tak, oraz sprawdzają ją tylko raz
    -   jak będziemy kopiować testowanie funkcjonalności do wielu testów to położymy wiele testów z jednego powodu, to utrudni zrozumienie problemu
-   nie testują metod prywatnych
-   badają zachowanie a nie stan
    -   dla usera istotne jest zachowanie UI a nie stan komponentu
-   zachowują precyzyjne asercje
    -   precyzyjne wskazanie gdzie jest bład
-   pokrywają znalezione defekty
-   nie są zakomentowane na wieki
-   sprawdzają happy path i również sad path
    -   happy path - aplikacja poprawnie działająca, to jest spodziewane
    -   sad path - coś gdzieś jest nie halo, to też powinnien być oczekiwany scenariusz, wychwytywanie rozmaitych przypadków
-   tanie w utrzymaniu
    -   testy mogą być zbyt drogie do utrzymania bo
        -   testują zbytnie szczegóły
        -   testują stan zamiast zachowania

### Struktura testu

Aktualnie używa się dwóch popularnych sposóbow pisania testów. Używamy komentarzy do pokazania struktury

-   Arrange, Act, Assert

```js
// arrange - przygotowanie danych wejściowych
// act - interakcja, czynność, wywołanie
// assert - weryfikujemy rezultat, czy jest poprawny
```

-   Given, When, Then

```js
// given - przygotowanie danych wejściowych
// when - interakcja, czynność, wywołanie
// then - weryfikujemy rezultat, czy jest poprawny
```

### Testy False-Positive, Flase-Negative

Kategorie problematycznych testów na które trzeba uważać, np. zafixowana data, która kiedyś wybuchnie

https://khorikov.org/posts/2020-01-29-false-positives-negatives/

-   True-Pass - przechodzi, powinnien
-   True-Fail - nie przychodzi, nie powinnien
-   **Flase-Pass - przechodzi, nie powinnien**
-   **False-Fail - nie przechodzi, a powinnien**

### Watość bojowa - zero

Jeśli nie wiesz jaki test chcesz napisać to lepiej tego nie robić. Wykonać konsultacje czy coś.

Dodatkowo jak mamy plany na przyszłość to w jest możemy to zapisać:

```js
it.todo("Tutaj moja obietnica do spełnienia");
```

-   **Dobrym pomysłem jest najpierw napisanie komentarzy z przypadkami testowymi, tak aby potem uzupełnić implementaje. Jak już wiemy co chcemy.**
-   Czy twój test jest czytelny? Intencja? Wczuj się w role programisty który po raz pierwszy czyta Twój test
-   NIE TESTUJEMY PRYWATNYCH METOD

### White-Box testing vs Black-box testing

-   White-box testing - testowanie znając implementacje, testujemy do tej implementacji
-   Black-box testing - nie znamy implementacji, nie wiem co jest w skrzynce, korzystam z publicznego API
    -   To jest lepsze, publiczne API nie powinno się zmieniać często
