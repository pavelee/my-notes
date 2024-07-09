https://www.perssondennis.com/articles/write-solid-react-hooks

## SRP

**moduł powinien być odpowiedzialny tylko za jedną rzecz**

komponent powinien robić tylko jedną rzecz 

zadaj pytania 

- czy ten komponent zajmuje się UI czy logika?
- czy ten hook zajmuje się tylko jednym typem danych (jedna oś zmiany)
- do jakiej warstwy należy ten komponent? czy zapisuje dane czy może wyświetla UI

**każdy komponent powinien mieć swój hook który obsługuje logikę** 

utrzymanie SRP powoduje że będziesz wstanie ponownie reuzyc tych samych komponentów

## OCP

obiekty w systemie powinny być otwarte na rozszerzanie, zamknięte na modyfikacje 

tłumacząc na React:

**Komponent nie powinien być zmieniany a jedynie reuzywany w innych komponentach**

