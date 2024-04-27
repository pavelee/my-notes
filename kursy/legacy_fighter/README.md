# Kurs Legacy Fighter

https://edu.devstyle.pl/products/lf-legacy-fighter

## Moduł 4: CQRS

### Problem wolmo działającej aplikacji

### Co to znaczy wolno>

Zanim zaczniesz optymalizacje zbierz dane o problemie.

Funadamentem jest zmierzenie czasu wykonania operacji, tak aby móc porównać różnice po wprowadzeniu zmian.

Sprawdź:

-   Gdzie mierzysz czas? Na jakim urządzeniu?
-   Kiedy mierzysz czas? Czy w konkretnym momencie?
-   Jak mierzysz? Czy to czas zapytania, moze renderowania?

### Wąskie gardła

w 95% procent to operacja Input oraz output. Czyli operacje wejścia i wyjścia.

Nie ma sensu szukać optymalizacji w kilku cyklach procesora, jeśli operacja wejścia/wyjścia trwa 1000 razy dłużej.

Szukamy punktów potencjalnych zagróżeń. Częstym problemem jest ORM i jego mechanizm lazy loading, czyli doładownie danych w trakcie wykonywania zapytania. Mechanizm lazy loading jest bardzo wygodny, ale może powodować wiele zapytań do bazy danych.

#### Problem N + 1

Tutaj często wykonujemy na procesorze zadania które moze wykonać baza danych.
Warto zastanowić się nad zapytaniami do bazy danych, które mogą zwrócić nam wszystkie dane w jednym zapytaniu.

#### Jak rozwiązać problem ?

Zmiana lazy lading na eager loading. To znaczy, że zamiast ładować dane w trakcie wykonywania zapytania, ładowane są od razu.
Natomiast taka zmiana jest ryzykowana, poniewaz inne części aplikacji mogą korzystać z mechanizmu lazy loading.

lazy loading jest dobry jak potrzebujemy tylko części danych, ale jeśli potrzebujemy wszystkich danych to warto zastanowić się nad eager loading. Nie mozemy jednak miec jednego rozwiązania dla wszystkich przypadków.

Często problemem jest to ze nasza encja ma dwa zbiory danych:

-   Potrzebne do podjęcia decyzji (agregat)
-   Potrzebne do wyświetlenia danych (DTO)

Serwis prosi o decyzje, kontroler o DTO

Finalnie często rozwiązaniem jest uzycie zapytań SQL, które zwracają nam dokładnie to co potrzebujemy. To nam najlepiej rozwiazuje
problem niewydajnych odczytów z bazy danych.
