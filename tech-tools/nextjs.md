## Nawigacja za pomocą motod routera

```js
import { useRouter } from 'next/Router';

const MySomeComponent = () => {
    const router = useRouter();

    const redirectWithPossibleBack = (path) => {
        router.push(path); // przekierowujemy do strony, możliwość cofnięcia się standardowym przyciskiem
    }

    const redirectWithNoBack = (path) => {
        router.replace(path); // przekierowujemy, bez możliwości cofnięcia się standardowym przyciskiem
    }

    // w przypadku przekierowania z parametrami

    const redirectWithParams = () => {
        router.push({
            pathname: '/somerouter/{id}/{id2}',
            query: {
                id: 'test1',
                id2: 'test2',
            }
        });
    }

    return (
        <div>render something</div>
    )
}

```

## Dodanie customowej strony 404

W folderze pages dodajemy plik **404.js**

```js

const NotFoundPage = () => {
    <div>My Custom Not Found Page</div>
}

export default NotFoundPage;

```