https://dev.to/itswillt/explaining-reacts-types-940?context=digest

## React.FC

React.FC uzywany do definiowania typu funkcyjnego w react 
od react 18 nie jest juz uzywany bo typescript automatycznie wylapuje typy danych

## React.ElementType

przydatny do renderowania dynamicznych komponentów 
przydatny do typowania komponentu jako props 
może przyjmować typy HTML np div

## React.ReactElement

przyjmuje tylko elementy które mogą być renderowane przez tylko przez React. np nie może przyjmować stringu 

## React.ReactNode

szerszy typ niż ReactElement może też przyjmować wszystko wszystko co może renderować React w tym string, number itp. 
jest wykorzystany często jak typ children bo może też przyjmować tekst 

![reactnode](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frw8khfxekei6wydxqkmb.png)



