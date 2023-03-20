## Routing

-   Next.js jest oparty o routing "plikowy"
-   Standardowo w reactie potrzebujemy dodatkowej logiki do obsługi routingu
    -   instalujemy react-router czy inna biblioteke
    -   definiujemy ścieżki w kodzie
-   Next.js skanuje folder **pages** i buduje routing za nas!
    -   /pages/index.js -> home.pl/
    -   /pages/about.js -> home.pl/about
    -   /pages/products/index.js -> home.pl/products
    -   /pages/procucts/[id].js -> home.pl/products/1
-   Plik strony oczekuje tylko zwykłego komponentu. Komponent musi być domyślnie wyeksportowany
```js

const MyPage = () => {
    return <div>Moja strona!</div>
}

export default MyPage;

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

## Dodanie customowej strony 404

W folderze pages dodajemy plik **404.js**

```js
const NotFoundPage = () => {
    <div>My Custom Not Found Page</div>;
};

export default NotFoundPage;
```
