https://www.thisdot.co/blog/communication-between-client-components-in-next-js

## wspólny kliencki komponent 

w praktyce to będzie kontekst który trzyma wspólny state dla komponentów klienckich 

## wykorzystanie URL jako state 

komponenty klienckie mogą dzielić się state poprzez URL

tutaj wykorzystujemy useSearchParams

co istotne jeśli jest statyczna strona to klienckie komponenty muszą być w suspense (wymóg nextjs) https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering

```js
// app/using-query-params/components/counter-display.tsx
"use client";
import { useSearchParams } from "next/navigation";

export default function CounterDisplay() {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get("counterValue") || "0";

  return <div>Counter Value: {currentValue}</div>;
}
```

użycie suspense

```js
// app/using-query-params/page.tsx
import CounterDisplay from "@/app/using-query-params/components/counter-display";
import Button from "@/app/using-query-params/components/button";
import { Suspense } from "react";

export default function UsingQueryParamsPage() {
  return (
    <div>
      <h1>Using Query Params Page</h1>
      <Suspense>
        <CounterDisplay />
      </Suspense>
      <p>Some content goes here</p>
      <Suspense>
        <Button />
      </Suspense>
    </div>
  );
}
```

