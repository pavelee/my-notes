https://www.udemy.com/course/jak-pisac-dobre-user-story

[material](./material.pdf)

## Sekcja 1: Wprowadzenie

-   Kurs jest dla wszystkich, którzy chcą nauczyć się pisać dobre user story
    -   analitcy
    -   programiści
    -   Product Ownerzy
    -   Scrum Masterzy

## Sekcja 2: CCC - o co w tym chodzi?

### Czym są User stories?

**Oczekiwania użytkowników opisane w naturalnym języku**

Język naturalny, czyli bez specjalnej konwencji. Opisujemy tak jakbyśmy rozmawiali ze sobą.

Skupiamy się na tym czego użytkownicy chcą a nie na konkretnych rozwiązaniach.

Idealnie aby to były realne osoby, które korzystają z naszego produktu. Wtedy mamy pewność, że to co piszemy jest zgodne z ich oczekiwaniami.

Np. "Jako użytkownik nie chce aby mój telefon zadzwonił w trakcie spotkania, więc chce aby dało się go wyciszyć"
To jest potrzeba ale nie rozwiązanie jeszcze. Rozwiązań może być wiele.

Mówiąc inaczej, znamy problem, wiemy co chcemy osiągnać ale jeszcze nie koniecznie znamy rozwiązanie.

### Historia user story i możliwe pułapki

User story rozpoczeło się na początku XI wieku.

Opisywanie wymagań językiem naturalnym może prowadzić do wielu problemów.

### C czyli Card

karta czyli user story, większość wykorzystuje jakiś schemat do opisywania karty.

59% korzysta ze schematu:

```
Jako (ktoś) chciałbym (coś osiągnąć) aby (jakaś korzyść)
```

Osoby które korzystały ze schematu były bardziej zadowolone z efektów.

(ktoś) - persona, nie powinna być wymyślona. **Najlepiej stowrzyć słownik** możliwych personas.

(coś osiągnąć) - to co chcemy osiągnąć, to jest nasz cel. Powinnien być prawdziwy cel. **Nie powinno być rozwiązaniem**.

(jakaś korzyść) - to co zyskamy po osiągnięciu celu. To jest nasza korzyść. **Zadajemy pytanie dlaczego?**
Jeżeli dotrzemy do tego dlaczego klient tego chce to zbudujemy znacznie lepsze rozwiązanie.

"Jako osoba jeżdząca pociągami, chciałbym mieć numer peronu na bilecie, aby nie musieć szukać informacji na tablicy i biegać po dworcu."

### Czego unikać w tytułach User story?

Nie powinno się wstawiać całego User Story w tytule. Tytuł powinien być krótki i zwięzły. Inaczje ciężko będzie się odnaleźć w backlogu.

### Jak nazywać User Story?

Czyli np. dla User story "Jako osoba jeżdząca pociągami, chciałbym mieć numer peronu na bilecie, aby nie musieć szukać informacji na tablicy i biegać po dworcu."

Damy tytuł "Numer peronu na bilecie"

### C czyli Conversation

Rozmowa na temat User Story. Najlepiej aby z takiej rozmowy powstała notatka.

Powinno to być uporządkowania notatka z rozmowy, tak aby dało się do tego wrócić po jakimś czasie. Unikamy chaosu.

Idealnie aby zawierały słowa kluczowe po których będzimy szukać w przyszłości takich funkcjonalności.

Może zawierać:

-   Problem - opisanie problemu który chcemy rozwiązać bardziej szczegółowo
-   Ograniczenia i założenia - opisanie możliwych problemów które mogą wystąpić, np. informacja jest przekazywana ze sporym opóźnieniem
    -   tutaj możemy też opisać jakieś założenia, np. że nie mamy wpływu na to jakie informacje dostajemy
    -   dodatkowe możliwe komplikacje np. klient może mówić w innym języku co może sugerować aby dać informacje w języku angielskim
-   Propozycje rozwiązania - jakieś propozycje rozwiązania problemu (burza mózgów)
    -   czyli jakie rozwiązanie możemy zaproponować przy obecnych ograniczeniach
    -   tutaj możemy rozpisać różne możliwości, przeanalizować plusy i minusy itp.
    -   np. przeniesienie numeru peronu na bilet
    -   w tym momencie skupiamy się na różnych rozwiązaniach, jeszcze nie wchodzimy w techniczne szczegóły
-   Kryteria akceptacji (testy) - jak będziemy testować dane rozwiązanie
    -   to już traktujemy jako ostatnie C czyli Confirmation

Dobrze się trzymać wypracowanego schematu, tak aby nie wprowadzać zamieszania w zespole.

### Cykl życia User Story (o czym i kiedy rozmawiać?)

Każda historyjka żyje zaczyna się od pomysłu do gotowego materiału do sprintu.

![Cykl życia User Story](./fazy.png)

#### Pierwsza faza (warsztaty zbierania wymagań)

Pomysł, tytuł, podstawowe założenia. To jest etap że historyjka nadaje się do backlogu. Gotowść możemy ropoznać po tym że sam opis
sugeruje że to jest wartościowe dla klienta.

To zwykle wykonuje Product Owner, Analityk biznesowy, Klient.

#### Druga faza (Analiza wymagań)

Doprecyzowanie user story, to jest moment gdzie analitycy mają wiele pytań i wątpliwości. To jest moment na rozmowę.

To zwykle wykonuje Analityk biznesowy, Klient. Czasami bierze udział Product Owner.

#### Trzecia faza (pierwszy przegląd techniczny)

Analiza rozwiązań, Analiza wykonalności, Zgrubne estymacje.

Tutaj musimy podjąc decyzje czy doprecyzowana user story jest realna do zrobienia. Szczególnie tutaj liczymy na osoby techniczne,
które powiedzą czy to jest wykonalne przy założeniach które mamy. Pomoże dobrać rozwiązanie do możliwości technicznych.

Zespół techniczny powinnien pomagać poprzez zadawanie pytań i sugerowanie rozwiązań.

Tutaj też możemy dokonąć zgrubnych estymacji. Tak aby porównać rozwiązania np. miesiąc a tydzień czasu itp.

To zwykle wykonuje Product Owner, Analityk biznesowy oraz techniczne osoby (programista, team leader, tech lead itp.)

#### Czwarta faza (przygotowanie do sprintu, np. grooming, refinement)

Przygotowanie do implementacji, doprecyzowanie detali.

Domykamy wszystkie szczegóły, nie zostawiamy tematów otwartych np. "to jest jeszcze do ustalenia", "to jest jeszcze do przemyślenia",
"nie wiemy jak się połaczymy z tym systemem to nam jakoś wyjdzie w praniu".

Musimy to doprecyzować ponieważ tutaj wykonujemy commitment na sprint. Zobowiązujemy się do dostarczenia tego w danym czasie.

To zwykle wykonuje Product Owner, Analityk biznesowy oraz cały zespół techniczny który będzie to implementował. Każdy powinnien mieć prawo się wypowiedzieć.

#### Jak sobie radzić ze zmianami w User Story?

Dopóki User story nie przejdzie przez czwartą fazę (przygotowanie do sprintu) to zmiany są dozwolone.

Oczywiście tutaj powinna byc kutltra pracy, czyli zmieniamy po ustaleniach, bez samowolki.

Jeżeli jest już faza developmentu, to już nie powinniśmy zmieniać treści bez jasnego oznaczenia zmiany. Na przykłąd można można oznaczyć kolorem zmiany np. czerwonym.

Ewentualnie dodanie extra sekcji z wprowadzonymi zmianami w treści. **To istotne aby to było jasno widoczne!**

#### Czego nie opisywać w Conversation?

-   Interwejsu użytkownika (UI). To nie jest takie istotne z perspektywy celu i dlaczego to robimy. Wchodząc tak głęboko w szczegóły możemy zatracić perspektywe wartości która chcemy dostarczyć. Dodatkowo założenia mogą się zmieniać w trakcie pracy z User Story.
-   Rozwiązania techniczne (sposób implementacji) - np. jakiej bazy danych użyjemy, jakie technologie itp. To jest zbyt techniczne i nie ma to wpływu na wartość którą chcemy dostarczyć.
-   Kopiuj-wklej, lepiej połaczyć User Story w jedno. Nie powinno być sytuacji gdzie mamy kilka User Story które są ze sobą powiązane. Lepiej połaczyć to w jedno.

#### C czyli Confirmation

czyli inaczej mówiąc testy, czyli jak sprawdzimy czy to co zrobiliśmy jest zgodne z User story (całościowo)

Tutaj nie chodzi o precyzyjne testy (np. jednostkowe) a chodzi o testy akceptacyjne czyli na poziomie biznesowym. Tak aby testy były niezależne od implementacji, np. na interfejsie użytkownika.

Popularny jest schemat "Gherkin" czyli język testów akceptacyjnych. Czyli Given, When, Then.

Given - stan początkowy
When - wykonanie jakieś akcji
Then - oczekiwany rezultat

np.

```
Given - mam wyłączone dźwięki w telefonie
When - dostaje telefon
Then - telefon nie wydaje dźwięku
```

Testy też można opisywać po prostu tekstowo jako oczekiwane rezultaty.

-   Brak powiadomień dla wyciszonego telefonu
-   Powiadamianie wibracjami w przypadku wyciszonego telefonu

#### Confirmation - przykład

Dla user story "Numer peronu na bilecie"

-   Wydrukowanie informacji o spodziewanym peronie odjazdu na bilecie kupowanym przez internet
-   Wydrukowanie informacji o spodziewanym peronie odjazdu na bilecie kupowanym w kasie
-   Umieszczenie informacji o spodziewanym peronie a nie finalnym
-   Umieszcznenie QR kodu z informacją o peronie na bilecie
-   uwzględnienie przyszłych rozkładów pracy

Finalnie powinniśmy uzyskać listę testów jakie może wykonać użytkownik mógł sprawdzić czy to co zrobiliśmy jest zgodne z oczekiwaniami.

Scenariusze powinny być bardziej precyzyjne jeśli to będzie testować oboba która jest spoza zespołu.

#### CCC - podsumowanie

C - Card
C - Conversation
C - Confirmation

Finalnie powinniśmy eksperymentować z tym co u nas działa, powinniśmy zbudować własny proces który będzie dostosowany do naszych potrzeb.

User story może składać się z różnych elementów, nie musi być zawsze takie samo. Ważne aby były zrozumiałe dla wszystkich.

#### CCC - User story przygotowanie do implementacji (przykład)

[user_story_przyklad](./user_story.pdf)

Unikajmy ściany tekstu, starajmy się zapisywać to rzeczowo w punktach.

User story pozostaje takie jak stworzyliśmy, nie powinnismy usuwać powstałych sekcji w czasie Conversation, tak aby zespół implementacyjny miał jak najwięcej kontekstu do pracy.

**Dodajemy nową sekcje "Implementacja"**

Tutaj opisujemy już wymagania techniczne, czyli jak to powinno być wykonane

Wymagania techniczne mogą być wykorzystane jako element testów automatycznych.

Powinno opisywać różne scenariusze np. co mamy zrobić jeśli dostaniemy błąd w odpowiedzi o serwisu? Tutaj możemy sugerować aby spróbować ponownie pobrać informacje do 3 razy

Powinnismy dodać makiery UI do impementacji

W przpadku kiedy widzimy że User Story znaczyna "puchnąć" to powinniśmy zastanowić się czy nie powinniśmy podzielić tego na mniejsze User Story.

## Sekcja 3: INVEST - przydatny skrót w User Story

### Wprowadzenie

Różnie jest to interpretowane, ale najczęściej jest to skrót który pomaga ocenić czy User Story jest dobra.

#### I jak Independent

Czyli niezależne.

Często mamy założenie że chcemy aby User story było kompletnie niezależne od innych User Story. Czyli nie powinno być tak że jedno User Story zależy od drugiego.

Natomiast więksośc aplikacji jest tak skonstruowana że jest zależność między User Story. Ale powinniśmy starać się aby była jak najmniejsza.
To wynika z tego że zwykle projektujemy jakiś proces, gdzie wyjęcie jednego elementu powoduje że cały proces nie działa.

Jednocześnie jeżeli chcemy aby były kompletnie niezależne to wyjdą nam duże User Story.

Powinniśmy to rozumieć jako dzielenie User Strory na mniejsze cześci tak długo aż przynuszą korzyści dla całego procesu.

Na przykład zbytnie podzielenie Usert Story może spowodować że podgubimy porces który chcemy zaimplementować.

Powinno dostarczać wartośc to najważniejsze, to powinna być mała wartość ale wartość.

Może zależeć od innych User Story ale powinno być jak najmniej.

#### N jak Negotiable

Czyli negocjowalne.

Nie powinno być od razu konkretnym rozwiązaniem. Powinno być możliwe do zmiany.
Opisujemy problem.
Podsumowanie rozmów (nogocjacji) powinno zamrozić zakres User Story.
Jeżeli co kolwiek chcemy zmienić po negocjacjach to MUSIMY rozmawiać ze sobą, nie robić samowolki.

#### V jak Valuable

Czyli wartościowe. Czyli cel i dlaczego.

Wartośc musi być po prostu zrozmuała, nie trzeba czegoś wymyślać specjalnie. Np. musimy wykonać zmianę bo zmienia się prawo i to nam umożliwi dalsze funkcjonowanie.

#### E jak Estimable

Czyli możliwe do oszacowania pod kątem czasochłonności.

W praktyce doświadczeni członkowie zespołu powinni być w stanie oszacować czasochłonność.

Na początku zrubna / relatywna, przed sprintem precyzyjna.

**Aby było estymowalne to musi być precyzyjne, nie może być zbyt ogólne.**

#### S jak Small

Czyli małe. Powinno być możliwe do zrealizowania w jednym sprintcie.

Po sprincie chcemy mieć coś do pokazania i przetestowania.

Powinniśmy też uwzględnić askepkty Definition of Done, czyli co musi być zrobione aby User Story była uznana za zakończoną.
Np. dokumentacja, testy, code review itp. to też powinniśmy liczyć do wielkości User Story.

To też ułatwia pracę techniczną ponieważ wykonujemy częsciej małe zmiany a nie rzadziej duże zmiany.

To jest forma sztuki aby zrobić coś małego ale wartościowego. Musimy to praktykować.

#### T jak Testable

Czyli możliwe do przetestowania.

Precyzyjne testy, pisanie takich testów pomaga zwerifikować czy User Story nie posiada jakiś błędów.

anty-przykład: Chciałbym aby system szybko odpowiadał na zapytania. To jest zbyt ogólne, nie wiemy co to znaczy "szybko". To nie jest testowalne.

#### INVEST - podsumowanie

-   I - Independent
-   N - Negotiable
-   V - Valuable
-   E - Estimable
-   S - Small
-   T - Testable

To jest skrót który pomaga ocenić czy User Story jest dobra.

### Sekcja 4: Dobre praktyki w pisaniu User Story

#### Wprowadzenie

Dobre praktyki w pisaniu User Story od Autora kursu.

#### Co załączać do User Story?

Załączaj do User Story wszystko co może być pomocne. Nigdy nie wiesz co Ci się możep przydać z jakiś czas.

Raczje nie będziesz pamiętał o tym kiedy zaczniecie pracę nad User Story, to jest tylko złudzenie że pamiętasz.

Linki, obrazki, diagramy, Notatki.

Notatki są istotne typu czego nam brakuje w User Story, co jest niejasne, co jest do ustalenia.

**Dobrą praktyką jest myślenie o User Story że będzie delegowane do kogoś innego. Czyli tak aby osoba która dostanie User Story miała wszystko co potrzebne do pracy.**

#### Jak łączyć User Story?

Istotne jest aby łaczenie User story było automatyczne, tak aby nie trzeba było tego robić ręcznie.

User Story pokazuje tylko przyrost a nie całą historię systemu.

Idalnie też linkować zlecenia z błędami do User Story.

#### Jak pracować z epicami?

Epiki to są duże User Story, które są zbyt duże aby je zrealizować w jednym sprintcie.

Epik powinnien spełniać zasady INVEST tak jak każde inne User Story.

Ceche SMALL w kontekście epika powinniśmy rozumieć jako okres kliku sprintów niż lat.

#### Czy warto łączyć User Story z procesem?

Tak, dlatego że procesy zwykle występują w systemach informatycznych.

Idealnie aby zmapować kroki procesu na User Story.

To pozwala zrozumieć czy przykryliśmy cały prces poprzez User Story (widać na diagramie).

#### W czym pomaga User Story mapa?

![User Story Map](./mapa.png)

Podział na kroki i detale.

User Story mapping to zaawansowana technika, najlepiej wykonać osobny kurs dotyczący tej techniki.

#### Czy w User Stories też powinny być wymagania niefunkcjonalne?

Zwykle użytkownicy mają problemy z definiowaniem wymagań niefunkcjonalnych.

Użytkownicy wyrażają to w sposób prostszy nie zwracając uwagi na to czy to jest wymaganie funkcjonalne czy niefunkcjonalne.

np. Chciałbym aby strona ... działała szybko, tak abym mógł komfortowo korzystać z niej.

Programista/Analityk powinnien dopytywać aby pomóc sprecyzować niefunkcjonalne wymagania.

Powinno to się znaleść jako element User Story.

#### Trick językowy, który pomaga pisać User Story

**Używanie formy czynnej w opisie User Story.**

Zamiast: Dokument jest generowany w formacie PDF
powinno być: Użytkownik inicuje generowanie dokumentu w formacie PDF

Pozwala to lepiej zrozumieć perspektywę użytkownika i tej czynności.

#### Kto powinnien pisać User Story?

Powinna to być osoba która ma minimalne doświadczenie w zbieraniu wymagań.

Popełnienie błędów w spisywaniu wymagań (User Story) może prowadzić do dużych strat finansowych, dostarczenia niepotrzebnych funkcjonalności itp. i potrzeby poprawiania tego w przyszłości.

Przydatne jest doświadczenie w developmentcie, wykonanie paru projektów, zrozumienie jak działa proces developmentu.

Idealnie jak osoba ma własne doświadczenia tego co działało a co nie działało.

Zrób test filtra - które wyrażenia są zbędne? W spisywaniu wymagań w naturalnym języku zawiera wiele ozdobników które nie są potrzebne.

To jest przykład testu jaki powinniśmy wykonywać aby szukać uspraowdzeń w naszym procesie, takie osoby są najlepsze do pisania User Story.

#### Kiedy rozbijać User Story na mniejsze historyjki?

Ważne jest aby nie rozbijać zbytnio wstecznie User Story.

Najlepiej trzymać User Story w jednej historyjce tak długo aż to możliwe, mimo wszystko jest znacznie łatwiej zarządzać jedną historyjką niż kilkoma.

Chodzi o to aby uniknąć sytuacji gdzie wcześnie rozbijemy User Story i zarządzanie tym będzie bardziej skomplikowane niż zarządzanie jedną historyjką.

Tutaj musimy mieć rozsądek, nie ma jednej reguły.

Zasada: Rozbijamy tylko wtedy kiedy jest to konieczne.

#### Kiedy nie stosować User Story?

Nie używaj User Story na siłę tak gdzie już na start nie pasują.

Np.

-   Zadania techniczne
-   W momencie kiedy jest jasne to trzeba zrobić (dokładnie znany zakres, nie potrzebne dyskusje), mamy rozpisany projekt i nie ma sensu tego rozbijać na User Story
    -   Rozpiszmy zadania techniczne, nie ma sensu tego robić na User Story

Czasami lepiej jest po prostu spisać wymagania w formie listy, nie musi to być User Story.

User Story mocno się przyjeło przez to że np. Jjira ma taką funkcjonalność, ale nie zawsze jest to najlepsze rozwiązanie.

#### Czy User Stories zastępują standardową analizę wymagań?

Używanie User Stories nie powinno być wwymówką do tego aby nie wykonywać solidnej analizy wymagań.

czyli opisanie np. Jako użytkownik systemu A chciałbym pobierać informacje z systemu B aby mieć dostęp do danych.

to nie jest analiza wymagań, to jest tylko początek. Przed przekazaniem User Story do zestawienia powinniśmy przeprowadzić solidną analizę wymagań.

#### Czym jest wartość z perspektywy User Story?

**User Story musi dostarczać wartość!**

Istotne aby nie skupiać się na funkcjonalności ale na wartości jaką dostarczamy. Nie zrozumienie dlaczego użytkownik chce danej funkcjonalności może prowadzić do błędów i gorszych rozwiązań.

**Pamiętaj że dostarczamy wartość a nie funkcjonalność.** Funkcjonalność to tylko środek do dostarczenia wartości.

### Sekcja 5: Podsumowanie i dlasza nauka

#### Gratulacje!

Pamiętaj aby szukać swojego sposobu na pisanie User Story, nie ma jednego dobrego sposobu.

Ważne żeby to dawało Ci wartość!

#### Co przed i po pisaniu User Story?

Zbieranie wymagań możemy wykonać poprzez User Story mapping. Autor posiada inne szkolenie w którym to jest opisane.

Dodatkowo jest szkolenie na temat estymacji, czyli jak oszacować czasochłonność User Story.

#### Z jakich źródeł uczyć się o User Stories?

Mike Cohn - User Stories Applied
