https://www.totaltypescript.com/workshops/typescript-pro-essentials

## Relacja Typescript z JavaScript

Typescript powstał bo praca z javascript w dużym codebase jest bardzo skomplikowana

Początkowo powstał silnik w C# który tłumaczenie C# na javascript było bardzo proste, script sharp jest to silnik który tłumaczy C# na javascript

## JS vs TS buld proces

![assets/typescript.png](assets/typescript.png)

W TS mamy serwer który działą w twoim IDE i momencie jak dokonujesz zmian to kompiluje i podkreśla wszystkie błędy

## Instalacja typescript

instalacja globalnie

```
npm -g install typescript
```

instalacja lokalnie

```
npm install -D typescriptF
```

następnie możemy użyć np.

```
tsc --version
```

aby sprawdzić czy tsc działa

## Wykonanie kompilacji

w folderze wykonujemy

```
tsc --init
```

następnie możemy przkompilować plik

```
tsc nazwa_pliku.ts
```

lub możemy uruchomić watch tak aby kompilować plik gdy zmieniamy go

```
tsc --watch nazwa_pliku.ts
```

## Porównanie Vite i TS

Co istotne w momencie integracji Vite z TS będziemy mieć w configu TS:

```js
...
"omitEmit": true,
```

Co oznacza że TS nie generuje plików JS, ponieważ tym już zajmuje się Vite

Vite używa esbuild, który jest alternatywą do tsc, to pozwala Vita na większą wydajność bez potrzeby sprawdzania typów i błędów

Natomiast nadal lokalnie potrzebujemy TS aby sprawdzał typy i wyświetlał nam błędy, więc mamy tutaj połączenie TS i Vite, natomiast aby mamy ustawione noEmit aby TS nie gryzł się z Vite.

### Uruchomienie TS w CI/CD na github

przykładowy github action:

```yml
name: CI
on:
    # Runs against all pushes
    push:
        branches:
            - "**"

    # Runs against all pull requests
    pull_request:
        branches:
            - "**"

jobs:
    ci:
        # Runs on the latest version of Ubuntu, a linux distro
        runs-on: ubuntu-latest
        steps:
            # Checks out the current branch using git checkout
            - uses: actions/checkout@v3

            # Sets up pnpm with version 7
            - uses: pnpm/action-setup@v2
              with:
                  version: 7

            # Sets up node
            - uses: actions/setup-node@v3
              with:
                  node-version: 16.x
                  # Sets up pnpm's cache
                  cache: "pnpm"

            # Install with frozen lockfile to ensure packages
            # are not accidentally updated
            - run: pnpm install --frozen-lockfile

            # Run the 'ci' script defined in package.json
            - run: pnpm run ci
```

Plik trzymany w .github/workflows/ci.yml

### Uruchomienie skryptu TS w aplikacji

zainstaluj tsx

```
npm install -D tsx
```

następnie dodaj skrypt do package.json

```json
{
    "scripts": {
        "my-script": "tsx scripts/my-script.ts"
    }
}
```

przykładowy skrypt

```ts
console.log("The script is working!");

const [, , ...args] = process.argv;

console.log(args);
```

### Array

array też można zapisać jako

```ts
Array<number>;
```

### Tuple

Tuple można też zapisać w formacie

```ts
[x: number, y: number]
```

to pozwala potem dostać podpowiedź od TS który parametr jest którym elementem

np.

rage: [x: number, y: number]

#### Opcjonalny parametr w Tuple

można to uzyskać na dwa sposoby:

```ts
[x: number, y?: number]
```

lub

```ts
[number, number?]
```