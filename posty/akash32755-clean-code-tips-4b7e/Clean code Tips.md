https://dev.to/akash32755/clean-code-tips-4b7e

Pisząc watunkowy kod w react mozemy doznac brzydkiego kod
w postaci masy warunkowych instrukcji

mozemy to rozwiazac poprzez komponent "Choice" który będzie poprawiał czytelność kodu

```jsx
type ChoiceProps = {
    condition: boolean,
    children: React.ReactNode,
};

export const Choice = {
    When: ({ condition, children }: ChoiceProps) =>
        condition ? children : null,
    Then: ({ condition, children }: ChoiceProps) =>
        !condition ? children : null,
    And: ({ condition, children }: ChoiceProps) => condition && children,
};
```

Teraz zamiast:

```jsx
return <>{value ? <div>Value is true</div> : <div>Value is false</div>}</>;
```

możemy zrobić:

```jsx
return (
    <>
        <Choice.When condition={value}>
            <div>Value is true</div>
        </Choice.When>
        <Choice.Then condition={value}>
            <div>Value is false</div>
        </Choice.Then>
    </>
);
```
