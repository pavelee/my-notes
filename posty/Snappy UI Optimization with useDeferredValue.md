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

'''
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);
  return (
    <>
      <ImportantStuff count={count} />
      <SlowStuff count={deferredCount} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
'''

**co istotne komponent który ma korzystać z hooka musi być wrappowany useMemo**, to pozwala aby React zatrzymał rerender jeśli nie było zmian zależności 




