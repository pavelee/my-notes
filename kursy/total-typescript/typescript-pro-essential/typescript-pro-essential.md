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


