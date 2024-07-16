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

## LSP

**jeżeli komponent dziedziczy po jakimś komponencie powinien akceptować takie same propsy i mieć taki sam return aby był kompatybilny z rozszerzanym komponentem** 

to onacza z jeśli mamy UseLocalStorage hook to jeśli stworzymy UseLocalAndRemoteStorage to ten hook powinien być kompatybilny z tym pierwszym pod kątem parametrów oraz return 

celem jest to aby dało się łatwo podmienić na dziedziczy element bez potrzeby zmian w kodzie

## ISP

interfejsy powinny szczegółowe tak aby rozweselający je nie musiał implementować czegoś czego nie będzie używał, analogowe komponenty powinny używać tylko interfejsów które są użyteczne 

**innymi słowy nie tworzymy wielkich interfejsów a grupy mniejszych wyspecjalizowanych**

## DIP

### Dependency inversion 

### Inversion of Control

### Dependency Injection



