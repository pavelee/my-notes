## Context

### Ogólnie

Wykorzystujemy Context API

-   do obsługi wide-state - globalny state w aplikacji
    -   komunikacja komponentów odległych w drzewie DOM
    -   ominięcie problemu props-drilling
-   jest to natywny mechanizm reacta
-   zwykle context zbieramy w folderze store (jako wydzielony store komponentów)

### Wykorzystanie

dodajemy context, najlepiej w osobnym pliku

```js
import { createContext, useState } from 'react';

// tworzymy kontest, gdzie argumentem jest domyślny stan kontekstu
// w przypadku przekazywanych funkcji dajemy tylko sygnature aby mieć przydatne podpowiedzi od IDE
const MyContext = createContext({
    test: null,
    doSomething: (value) => {} // wystarczy sama sygnatura, bez ciała
});

// tworzymy funkcje, providera contextu. Jest to wygodny sposób na stworzenie "warstwy" dostarczenia kontekstu.
// możemy tutaj dodać funkcje które operują na kontekście lub nawet hooki typu useEffect (w momencie jak coś się zmieni)
export const MyContextProvider = ({ children }) => {
    const [test, setTest] = useState();

    const doSomething = function(value) {
        return value;
    }

    return (
        <MyContext.Provider value={
            test,
            doSomething
        }>
            { children }
        <MyContext.Provider/>
    )
}

export default MyContext;
```

Wrapujemy nasz 