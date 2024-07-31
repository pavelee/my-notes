https://reacttraining.com/blog/use-useid-instead-of-hand-making-ids

rozwiązaniem tutaj jest użycie useID od react https://react.dev/reference/react/useId

co istotne ważne jest pamiętanie że jeżeli generujesz komponent po stronie serwera to musisz pamiętać o konsystencji pomiędzy serwerem a frontem 

jest to dostępne od React 18 

przed ract 18 można skorzystać z biblioteki 

```ts
import { useId } from '@reach/auto-id'
```