## Routing

- Next.js jest oparty o routing "plikowy"
- Standardowo w reactie potrzebujemy dodatkowej logiki do obsługi routingu
  - instalujemy react-router czy inna biblioteke
  - definiujemy ścieżki w kodzie
- Next.js skanuje folder **pages** i buduje routing za nas!
  - /pages/index.js -> home.pl/
  - /pages/about.js -> home.pl/about
  - /pages/products/index.js -> home.pl/products
  - /pages/procucts/[id].js -> home.pl/products/1
- Plik strony oczekuje tylko zwykłego komponentu. Komponent musi być domyślnie wyeksportowany

```js

const MyPage = () => {
    return <div>Moja strona!</div>
}

export default MyPage;

```

- Ścieżki można zagnieżdzać
  - np. /portfoilio/index.js -> home.pl/portfolio
  - np. /portfoilio/list.js -> home.pl/portfolio/list
- Zagnieżone ścieżki są świetnym sposobem organizacji logiki routingu aplikacji
- Dynamiczne ścieżki oznaczamy kwadratowymi bracketami
  - np. /test/[testid].js -> home.pl/test/1
  - Istotne! Next.js priorytezuje bardziej konretne ścieżki (kolejność szukania ścieżki)
    - np. /test/list.js > test/[testid].js
- Dynamiczne ścieżki można zagnieżdzać w folderach
  - np. /[id]/[clientid].js -> home.pl/1/42
- Dynamiczne ścieżki można zapisać jako kolejkcje dowolnych parametrów
  - np. /blog/[...slug].js -> home.pl/blog/ala/ma/kota
    - To nam umożliwa pobranie router.query -> ['ala', 'ma', 'kota']

## Routing - wyciąganie dynamicznych parametrów

Dynamiczne parametry możemy wyciągnąć za pomocą hooka useRouter

```js
import { useRouter } from 'next/router';

const SomePage = () => {
    const router = useRouter();
    const { myDynamicParam } = router.query;

    return (<div>param { myDynamicParam }</div>)
}

```

## Routing - Linkowanie

Używanie tradycyjnych linków

```html
<a href="/somepage">jakiś link</a>
```

Niesie za sobą wady:

- Tracimy efekt Single Page Apliaction, strona zostanie przeładowania
- Tracimy state aplikacji! Może to być spory problem dla naszych komponentów

Powinniśmy używać linków od Next.js

```js
import Link from 'next/link';

const SomePage = () => {
    return (<Link href="/somepage">jakiś link</Link>)
}
```

Dodatkowo mechanizm optymalizuje czas ładowania strony, np. prefetching w momencie jak najeżdzamy na link itp.

## Routing - Budowanie dynamicznie linku

Dyniamiczny link możemy zbudować na dwa sposoby

```js
<Link href={`/somepage/${id}`}>link</Link>
```

lub

```js
<Link href={{ pathname: '/somepage/[id].js', query: {id: 1} }}>link</Link>
```

## Nawigacja za pomocą motod routera

```js
import { useRouter } from "next/Router";

const MySomeComponent = () => {
    const router = useRouter();

    const redirectWithPossibleBack = (path) => {
        router.push(path); // przekierowujemy do strony, możliwość cofnięcia się standardowym przyciskiem
    };

    const redirectWithNoBack = (path) => {
        router.replace(path); // przekierowujemy, bez możliwości cofnięcia się standardowym przyciskiem
    };

    // w przypadku przekierowania z parametrami

    const redirectWithParams = () => {
        router.push({
            pathname: "/somerouter/{id}/{id2}",
            query: {
                id: "test1",
                id2: "test2",
            },
        });
    };

    return <div>render something</div>;
};
```

## API

Next.js umożliwa tworzenie API działającego po stronie serwera node.js

Umożliwa nam to budowanie full-stackowej aplikacji korzystając tylko z tego frameworka

Aby to zadziałało musimy dodawać nasze strony (page) w katalogu api

Musi to być ścieżka **pages/api**

### Prosta końcówka API

Napiszy prostą końcówkę API. Końcówka która tylko zwraca putego JSON'a

np. pages/api/simple.js

```js

// res - odpowiedź API, możemy na to wypływać
// req - request jaki dostaliśmy do API z nimi wszelkie informacje
function handler(res, req) {
    res.status(200).json({});
    return;
}

```

### Rozpoznanie metody requestu

```js
...
const method = req.method; // np. POST
...
```

## Dodanie customowej strony 404

W folderze pages dodajemy plik **404.js**

```js
const NotFoundPage = () => {
    <div>My Custom Not Found Page</div>;
};

export default NotFoundPage;
```

## Autoryzacja

### NextAuth.js

#### Instalacja

Rekomendowana paczka <https://next-auth.js.org>

Jest to gotowa bilbioteka, gotowa integracja z Next.js

Instalacja:

```bash
npm install next-auth
lub
yarn add next-auth
```

#### Dodajemy API

NextAuth wymaga rezerwacji ścieżek API do obsługi uwierzytelniania

W katalogu api dodajemy plik:

```js
/api/auth/[...nextauth].js
```

Z zawartością

```js
import NextAuth from 'next-auth';
// można wybrać z wielu providerów np. Google, Apple itp.
import Providers from 'next-auth/providers';

// exportujemy handler od NextAuth, przekazujemy konfiguracje
export default NextAuth({
    session: {
        jwt: true // zaznaczamy że chcemy używać JWT w sesji do uwierzytelniania
    },
    providers: [
        Providers.Credentials({ // provider dla własnej metody uwierzytelniania
            async authorize(credentials) { // piszemy własną metodę uwierzytelnienia
                // credentials - to obiekt który przekazujemy podczas logowania
                // mamy tutaj np. credentials.email

                if (NotAuthorize) {
                    // w przypadku błednych danych powinniśmy zwrócić błąd
                    throw new Error('Bad password or login');
                }

                // zwaracamy obiekt jako sygnał że uwierzytalnianie poprawne
                // dane zawarte w obiekcie będą trzymane w tokenie JWT
                return {
                    data: 'some data',
                };
            }
        })
    ]
});
```

#### Wykonanie logowania

Aby wykonać logowanie należy wykorzytać metodę **signIn** z pakietu next-auth

Metoda wykonuje request pod spodem. Nie musimy już tego robić ręcznie.

Przykład:

```js
import { signIn } from 'next-auth/client'; 

const SomePage = () => {
    const authenticate = async () => {
        // zawsze dostajemy zwrtkę, patrzymy na klucz "error", jeśli pusty to znaczy poparwne uwierzytelnianie
        const result = await signIn(
            'credentials', // pierwszy parametr to provider
            {  // drugi parametr to konfiguracja, przekazywany jako "credentials" obiekt do handlera
                redirect: false, // nie chcemy redurect w przypadku błedu, domyślnie przekierowuje do strony błędu
                login: 'jakiś login',
                password: 'jakieś hasło',
            }
        );
    }
}

export default SomePage;
```

#### Sprawdzenie czy użytkownik jest zalogowany

Używamy hooka **useSession** z pakietu next-auth

przykład:

```js
import { useSession } from 'next-auth/client';

const Component = () => {
    // session - zawiera sesje z danymi użytkownika - jeśli istnieje to znaczy że użytkownik jest zalogowany
    // loading - czy oczekujemy request logujący
    const [session, loading] = useSession();

    // Uwaga! Dodatkowo sprawdzamy czy przypadkiem nie czkamy na request uwierzytalniący, stad !loading

    return (
        <div>
            Czy zalogowany?
            { !session && !loading && <span> nie zalogowany </span> }
            { session && <span> zalogowany </span> }
        </div>
    )

}
```

#### Wylogowanie

Używamy funkcji **singOut** z pakietu next-auth

przykład

```js
import { signOut } from 'next-auth/client';

const logoutHandler = () => {
    signOut();
}

const Component = () => {
    return (<div>
        <button onClick={logoutHandler}>
    </div>)
}
```

#### Chronienie ścieżek - tylko dla uwierzytelnionych

##### Rozwiązanie 1 - workaround

W praktyce useSession posiada bug z brakiem aktualizacji wartości loading

Jako workaround możemy użyć getSession, który pobiera aktualina sesje poprzez request API

przykład:

```js
import { useState, useEffect } from 'react'; // potrzebujemy aby ręcznie obsłużyć proces stanu ładowania
import { getSession } from 'next-auth/client';

const SomeComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSession, setLoadedSession] = useState();

    useEffect(() => {
        getSession().then(session => {
            // w przypadku braku uwierzytelnienia, przekierowujemy do logowania
            if (!session) {
                window.location.href = '/auth';
            } else {
                // przypadek kiedy mamy sesje i skonczyliśmy request
                setIsLoading(false);
            }
        })
    }, []);

    // czekamy na decyzje o uwierzytelnieniu
    if (isLoading) {
        return <div>Ładowanie</div>
    }

    return (
        <div>render something</div>
    )
}
```

##### Rozwiązanie 2 - Pobierane danych podczas renderingu strony (getServerSideProps)

Pobieramy dane podczas generownia strony

przykład

```js
import { getSession } from 'next-auth/client';

const SomePage = () => {
    return (
        <div>render something</div>
    )
}

export async function getServerSideProps(context) {
    // przekazujemy request, getSession automatycznie wyciaga potrzebne dane
    const session = await getSession({req: context.req});

    if (!session) {
        return {
            redirect: { // feature next.js, wymuszenie przekierowania
                destination: '/auth',
                permanent: false, // istotne, aby było tymczasowe, brak cache przeglądarki
            }
        }
    }

    return {
        props: {
            session
        }
    }
}
```

#### Chronienie ścieżek - optymalizacja ilości zapytań

Możemy wykorzystać Provider od next-auth aby udostępnić informacje o sesji dla podkomponentów

Musimy dodać do _app.js wrapującego providera:

```js
import { Provider } from 'next-auth/client';

const MyApp = ({ Component, pageProps }) => {
    return (
        // może się okazaż że session jest undefined, to jest ok
        // wartość pochodzi od metod getServerSideProps ktore ladują obiekt sesji do komponentu
        <Provider session={pageProps.session}> 
            <Component {...pageProps} />
        </Provider>
    )
}
```

### Hashowanie hasła

```js

import { hash } from 'bcryptjs';

export async function hashPassword(plainPassword) {
    return await hash(plainPassword, 12); // 12 - usatwienie mocy hasła
}

```

użycie w kodzie

```js
...
const hashedPassword = await hashPassword(plainPassword);
...
```

### Porównywanie hasła

```js

import { compare } from 'bcryptjs';

export async function verifyPassword(password, hashedPassword) {
    return await compare(password, hashedPassword);
}

```

użycie w kodzie

```js
...
const hashedPassword = await hashPassword(plainPassword);
const isValidPassword = await hashPassword(plainPassword, hashedPassword);
...
```

## Baza danych - MongoDB

### Instalacja

Instalujemy paczke mongodb

```bash
npm install mongodb
lub
yarn add mongodb
```

### Definiowanie konektora

Dodajemy w projekcie plik db.js (lub dowolna inna nazwa)

```js
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    return async MongoClient.connect('connection string');
}
```

### Polaczenie w handlerze API

```js

import { connectToDatabase } from 'sciezka_do_pliku_dbjs';

async function handler(req, res) {
    const client = await connectToDatabase();
}

```

### Przydatne info

Jeśli otwieramy połaczenie, zawsze zamykajmy na końcu skryptu

```js

client.close();

```

### Szukanie jednego rekordu

```js

const record = db.collection('kolekcja').findOne({}); // gdzie określamy parametry

```

### Dodanie rekordu

```js

import { connectToDatabase } from 'sciezka_do_pliku_dbjs';

async function handler(req, res) {
    const client = await connectToDatabase();

    const db = client.db;

    db.collection('nazwa_kolekcji'); // tworzy się w locie jeśli nie istnieje

    const result = await db.collection('nazwa_kolekcji').insertOne({
        data: 'data'
    }); // result zawiera utworzony rekord
}

```
