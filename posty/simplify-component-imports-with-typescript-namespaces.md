https://sergiodxa.com/tutorials/simplify-component-imports-with-typescript-namespaces

wykorzystując namespace możemy ukrócić kod

```ts
import { Button } from "./button";

export namespace BetterButton {
  export type Props = Button.Props & { ... };
}

export function BetterButton(props: BetterButton.Props) { ... }
```

dzięki zastosowaniu 

```ts
export namespace Button {
  export type Variant = "solid" | "ghost" | "outline";
  export type Size = "xs" |  "sm" | "md" | "lg" | "xl";
  export type Props = {
    variant: Variant;
    size: Size;
  }
}
```

