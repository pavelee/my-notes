## Moduł 000

Jeśli będiesz wtanie argumentować przed biznesem to będziesz miał większe szanse na to, żeby zaimplementować DDD w projekcie.

Stajesz się pro-aktywnym doradcą a nie tylko wykonawcą.

Pomagasz dowozić projekty, a nie tylko je wykonywać.

Rozumiesz principla z których wynikają wzorce, dlaczego ich używamy. To pozwala na to, żeby zastosować je w odpowiednich miejscach.

Będziesz wstanie wskazać alternatywne rozwiązania, które są bardziej odpowiednie dla danego problemu.

Umiejętność zadawania pytań, które pomagają zrozumieć problem. Znalezienie optymalnego rozwiązania.

Usuwanie blokady zależności pomiędzy zespołami, poprzez rozwiązanie problemu zależności modułów.

Eleminowanie mody i przypadku z projektu technicznego. Zbytecznej złożności która nie wnosi wartości.

Celem nie jest nauka DDD tylko zrozumienie problemów biznesowych i technicznych, które pozwolą na zastosowanie DDD w projekcie.

## Moduł 001

### L01. Despota-driven Development

-   Problem jest gdzie do wszystkiego podchodzimy do CRUD
-   Głównym problemem jest to że dane są edytowane zróżnych miejscach
-   Problemem jest to że procesy operują na danych pomiędzy różnymi modułami
-   CRUD może być większą ilością kodu w projekcie niż kod biznesowy
-   System płytki to system gdzie pomiędzy UI a bazą danych nie ma żadnej warstwy biznesowej
-   System głęboki to system gdzie pomiędzy UI a bazą danych jest warstwa biznesowa
-   Zwykle problemem jest brak rozpoznania klasy problemów, które są w systemie i które powinny być rozwiązane
-   Data envy - kiedy jedna klasa chce mieć dostęp do danych z innej klasy
-   Feature envy - kiedy jedna klasa chce mieć dostęp do metod z innej klasy
-   Problemy zostaną rozwiązane "druciane" czyli poprzez mieszanie modułów i klas

### L02. Disaster-driven Design
