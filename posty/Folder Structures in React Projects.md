https://dev.to/itswillt/folder-structures-in-react-projects-3dp8

Struktury folderów w projekcie powinny być uzależnione od złożoności rozwiązywanego problemu

## Grupowanie poprzez typ pliku

Idealne dla małych projektów, ewentualnie średnich

Jest to bardzo proste podejście, które polega na grupowaniu plików na podstawie ich typu. Wszystkie pliki związane z jednym typem funkcjonalności są przechowywane w jednym folderze. Zalętą jest prostota i łatwość w nawigacji.

Problemem jest brak powiązania z biznesowymi funkcjonalnościami, co może prowadzić do problemów z utrzymaniem projektu w przyszłości.

W przypadku rozrostu projektu będzie coraz ciężej utrzymać porządek w plikach. Będzie wszystko wymieszane.

```
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── SignUpForm.tsx
    │   ├── Employees.tsx
    │   ├── PaymentForm.tsx
    │   └── Button.tsx
    ├── hooks/
    │   ├── usePayment.ts
    │   ├── useUpdateEmployee.ts
    │   ├── useEmployees.ts
    │   └── useAuth.tsx
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```

## Grupowanie poprzez typ pliku i funkcjonalność

**Jest to polecane jeśli nie mamy pewności jak będzie rozwijał się projekt**. Pozwala na łatwe dodawanie nowych funkcjonalności do projektu.

Jest to podobne do pierwszego poziomu ale jeszcze dodatkowo dzielimy typy plików na podstawie funkcjonalności. Wszystkie pliki związane z jedną funkcjonalnością są przechowywane w jednym folderze.

Minusem jest nadal problem z rozposzeniem komponentów per funkcjonalność. W przypadku dużego projektu będzie to problematyczne.

```
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── auth/
    │   │   └── SignUpForm.tsx
    │   ├── payment/
    │   │   └── PaymentForm.tsx
    │   ├── common/
    │   │   └── Button.tsx
    │   └── employees/
    │       ├── EmployeeList.tsx
    │       └── EmployeeSummary.tsx
    ├── hooks/
    │   ├── auth/
    │   │   └── useAuth.ts
    │   ├── payment/
    │   │   └── usePayment.ts
    │   └── employees/
    │       ├── useEmployees.ts
    │       └── useUpdateEmployee.ts
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```

## Grupowanie poprzez funkcjonalność/moduł

Dla dużych i złożonych projektów.

Funkcjonalności/moduły są reprezentacją biznesowych funkcjonalności projektu. Wszystkie pliki związane z jedną funkcjonalnością są przechowywane w jednym folderze.

Ceną tego jest to że musisz dobrze rozumieć logikę biznesową projektu. Wymaga to od ciebie zrozumienia jakie są funkcjonalności w projekcie i jak są one ze sobą powiązane.

Celem jest to aby wiedzieć gdzie szukać konkretnych plików w projekcie. np. edycja funkcjonalności związanej z logowaniem będzie w folderze auth.

```
└── src/
    ├── assets/
    ├── modules/
    |   ├── core/
    │   │   ├── components/
    │   │   ├── design-system/
    │   │   │   └── Button.tsx
    │   │   ├── hooks/
    │   │   ├── lib/
    │   │   └── utils/
    │   ├── payment/
    │   │   ├── components/
    │   │   │   └── PaymentForm.tsx
    │   │   ├── hooks/
    │   │   │   └── usePayment.ts
    │   │   ├── lib/
    │   │   ├── services/
    │   │   ├── states/
    │   │   └── utils/
    │   ├── auth/
    │   │   ├── components/
    │   │   │   └── SignUpForm.tsx
    │   │   ├── hooks/
    │   │   │   └── useAuth.ts
    │   │   ├── lib/
    │   │   ├── services/
    │   │   ├── states/
    │   │   └── utils/
    │   └── employees/
    │       ├── components/
    │       │   ├── EmployeeList.tsx
    │       │   └── EmployeeSummary.tsx
    │       ├── hooks/
    │       │   ├── useEmployees.ts
    │       │   └── useUpdateEmployee.ts
    │       ├── services/
    │       ├── states/
    │       └── utils/
    └── ...
```

## Dodatek jak nazywać katalogi per cel pliku

-   UI komponenty
    -   components - komponenty UI
    -   design-system - fundamendalne komponenty UI na podstawie np. design system
    -   icons - ikony
-   Powiązane z react
    -   hooks - customowe hooki
    -   hocs - higher order komponenty
    -   context/providers - globalne stany
-   Użyteczne oraz integracje
    -   utils - funkcje pomocnicze
    -   lib - biblioteki zewnętrzne, powiązane z konkretną technologią
    -   plugins - pluginy dla zewnętrznych bibliotek np. i18n, Sentry etc.
-   Logika biznesowa
    -   services - logika biznesowa, np. integracje z API
    -   helpers - funkcje pomocnicze dla logiki biznesowej
-   style
    -   styles
-   typescript oraz konfiguracja
    -   types - pliki z typami
    -   configs - konfiguracja projektu
    -   constants - stałe wartości
-   Komunikacja z serwerem
    -   api - pliki związane z komunikacją z serwerem
    -   graphql - pliki związane z graphql
-   State managment
    -   states - globalne stany
    -   reducers - reducery dla globalnych stanów
    -   actions - akcje dla globalnych stanów
    -   selectors - selektory dla globalnych stanów
-   Testy
    -   tests - testy
    -   mocks - pliki z mockami
