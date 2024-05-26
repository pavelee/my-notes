https://www.joshwcomeau.com/react/use-deferred-value

## UseDeferredValue

hook jest często nie doceniony

ma potencjał wpłynąć pozytywnie na UX

## Problem

czeste odświeżanie kosztownego UI w tym przypadku snipettu który posada kolorowanie a to jest sporo makrupu

możemy tutaj szukać rozwiązań opóźniających odświeżania np tylko raz na 200ms ale to powoduje że lepsze urządzenia też tracą a chociaż mozga odświeżać szybciej

zwykle można zauważyć które elementy UI mają większy/mniejszy priorytet

![img](https://www.joshwcomeau.com/images/use-deferred-value/high-vs-low-priority.png)

## Rozwiązanie

useDeferredValue to hook który pozwala dzielić UI na ten o wysokim i niskim priorytecie update

przykład użycia

```js
function App() {
    const [count, setCount] = React.useState(0);
    const deferredCount = React.useDeferredValue(count);
    return (
        <>
            <ImportantStuff count={count} />
            <SlowStuff count={deferredCount} />
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    );
}
```

**co istotne komponent który ma korzystać z hooka musi być wrappowany useMemo**, to pozwala aby React zatrzymał rerender jeśli nie było zmian zależności

w przypadku kiedy mamy bardziej skomplikowany state to możemy przekazać to jako jeden string

## obsługa loadera

możemy złapać moment kiedy jeszcze wolniejsze UI nie odświeżyło się poprzez trick

```js
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);
  const isBusyRecalculating = count !== deferredCount;
  // ...
```

## Zmiany w React 19

Od react 19 możemy przekazać wartości inicjująca dla UseDeferredValue co pozwala na początkowy render zanim odświeży się wartość 

np możemy ustawić to jako null i dzięki temu nie renderować początkowego stanu komponentu a mimo to realna wartość będzie już intem

## Więcej w react docs 

https://react.dev/reference/react/useDeferredValue

więcej use case w tym oblusga suspense 