https://www.youtube.com/watch?v=S8lMTwSRoRg

-   Dodanie nowego node, umozliwia dodawanie nowych elementow do sceny w tym przyciskow itp.
-   TextureButton - to jest button który został stworzony przez designera
-   Zduplikowanie buttona -> ctrl + D lub prawy i duplikuj
-   Do kadego elementu mozemy dodać sygnaly lub grupy
-   get_tree() to jest całe drzewo gry

### darmowe assety do gry https://ansimuz.itch.io/sunny-land-pixel-game-art

### Zbudowanie Menu

    - Dodajemy button jako node
    - Ustawiamy tekst buttona
    - Dodajemy do main'a script (kliknięcie na Main i potem "new script" jako przycisk w prawym górnym rogu) -> get_tree().quit();

### Rozpoczęcie gry

-   Dodanie nowej sceny dla gry (np. World)
-   przestawienie na nową scene po kliknięciu play

### Import assetów

    - Naley ustawić renderowanie na "nearest" z "linear" aby obrazki były rozpixelowane

### Utworzenie gracza

-   Dodanie nowego node (sceny) -> CharacterBody2d
-   Zmiana nazwy na Player lub coś w stym stylu
-   Dodanie CollisionShape2d
-   Ustawienie na CollisionShape2d, kształt -> capsuleShape2d
-   Następnie dodajemy AnimatedSprite2d
-   Następnie przechodzimy do Animation -> wybieramy SpriteFrames to powinnno nam otwrzyć edtor animacji
-   Mozemy dodać kolejne formy animacji i przypisać do nich pliki png, jest tez mozliwe wyciecie ze sprite konkretnych klatek animacji
-   Dodajemy skrypt do naszego gracza (uzywamy bez wlaczenia tak aby utworzyl nam plik ktory mozemy edytowac)
-   Dodajemy naszego gracza do glownej sceny

### Tworzenie tla mapy

-   Na głównej scenie dodajmy node -> StaticBody2d (do tworzenia scian, podlogi czy nawet platform ktore chcemy ruszac)
-   Następnie dodajemy CollisionBody2D do StaticBody2d
-   Ustawiamy RectangleShape2d na CollisionBody2d i ustwiamyn na mapie
-   Mozemy teraz skopikowac nasz collision poprzez ctrl + D
-   Następnie tą drugą kolizje musimy ustawić jako unikalna
-   Następnie dodajemy Panel który jest elementem pozwalający np. ustawić style dla kolicji np. trawa itp.

### Animowanie player

-   w skrypcie gracza musimy dodać ustawienie jaka animacja ma się zacząć wykonywać na start gry:

```ts
func _ready():
    get_node("AnimatedSprite2D").play("Idle")
```

-   jeżeli chcemy zdefiniować zmienną która zostanie inicjowana na start programu

```ts
@onready var playerNode = get_node("AnimatedSprite2D");
```

### Ustawienie kamery gry

-   Dodajemy node Camera2D do gracza, tak aby zblokowało widok na nim (podążanie kamery)

### Dodanie animacji poprzez AnimationTree

-   Mamy dwa sposoby (node): AnimationPlayer/AnimationTree
    -   AnimationPlayer jest znacznie bardziej popularne
-   Dla AnimationPlayer

    -   Klikamy na pasku "Animacje"
    -   Następnie klikamy na przycisk "Animacja" -> "nowa"
    -   Następnie klikamy AnimatedSprite2D i otwieramy na dole tab "Animacje", to istotne aby AnimatedSprite2D był zaznaczony
    -   Klikamy "kluczyk" przy Animation, pojawi się dialog, odklikujemy "RESET ..." i utwórz
    -   **Aby móc robić animacje na poziomie miliseknud musimy przybliżyć widok czasu na animacji (suwak)**
    -   Istotne że mamy dwie opcje
        -   zapętlenia animacji (tak aby wykonywała się w pętli)
        -   ustawienie aby animacja była odtwarzana po załadowaniu
    -   Następnie możemy użyć dodanych animacji dla Playera w kodzie, wiec musimy się pod nie podpiąć:
        -   ```ts
            @onready var playerNode = get_node("AnimationPlayer");
            ```
    -   Rozpoznanie czy gracz skacze do góry, czy spada w dół

        -   ```ts
            func isPlayerJumpingUp():
                return velocity.y != 0

            func isPlayerFalling():
                return velocity.y > 0;
            ```

    -   Sprawdzenie kierunku poruszania i odwrócenie gracza w przeciwnym kierunku (lustrzane odbicie w sprite)

        -   ```ts
            func turnPlayerLeft():
                get_node("AnimatedSprite2D").flip_h = true

            func turnPlayerRight():
                get_node("AnimatedSprite2D").flip_h = false

            func getPlayerDirection():
                return Input.get_axis("ui_left", "ui_right")

            func isPlayerMovingLeft():
                return getPlayerDirection() == -1

            func isPlayerMovingRight():
                return getPlayerDirection() == 1
            ```

    -   Odwrócenie gracza (lustrzane odbicie)
        -   Można to zrobić manualnie (dla testu), AnimatedSprite2D i potem "Offset" i "Flip H"
    -   Ustawienie strefy kolizji
        -   Tutaj

### Tworzenie tła gry

-   Dodajemy nową scene z innym node: ParallaxBackground

    -   następnie do niego dodajemy ParallaxLayer
    -   Dodajemy grafikę tła (drag and drop)
    -   Następnie dodaną grafikę zapisujemy jako scene np. BG
    -   Następnie przeciągamy ją jako dziecko ParallaxLayer
    -   Możemy szybko rozszerzyć naszą mapę (powielić) poprzez wykonanie mirroring
        -   na ParallaxBackground klikamy i w "Motion" wpisujemy w sekcji "Mirroring" pozycje X gdzie kończy się grafika, to spowoduje powielenie jej jako lustro
    -   Następnie możemy dodać efekt "przesuwania" się tła poprzez dodanie skryptu do ParallaxBackground

        -   ```ts
            extends ParallaxBackground


            var scrollingSpeed = 100

            func _process(delta):
                scroll_offset.x -= scrollingSpeed * delta
            ```
    -   Możemy też uzyskać efekt innej prędkości przesuwania warstw, możemy na drugiej warstwie ParallaxBackground w zakładce "motion" ustawić Scale X: 0.7 a y: 1

-   Skopiowanie tła do innej sceny i przekształcenie na lokalne aby było możliwe przerobienie
    -   możemy to uzyskać poprzez wrzucenie naszej sceny BG i następnie prawym -> "ustaw jako lokalne", to nam umożliwi usunięcie czy zmiany w już istniejącym tle

### TileMaps i TileSets

#### Rysowanie TileMap

-   Dodajemy TileMap jako node dla naszej sceny np. "World"
-   Następnie przesuwamy ją jako pierwsze dziecko dla World
-   Następnie na dole przechodzimy do TileSet
-   Dodajemy poprzez przeciągniecie swoje "tileset" i klikamy tak na wyskakujacy popup
-   Następnie przechodzimy do zakładki "TileMap", wchodzimy tryb malowania i dodajemy do mapy elementy
-   Możemy skorzystać z opcji "prostokata" tak aby szybko narysować cały obszar

#### Dodanie kolizji dla TileMap

-   Wchodzimy w node TileMap
-   Klikamy na "TileSet"
-   Wchodzimy w "Physic Layers"
-   dodajemy warstwę
-   Przechodzimy do "TileSet"
-   Przechodzimy do sekcji "Maluj"
-   W maluj właściwości wybieramy Fizyka -> warstwa fizyki 0
-   Zaznaczamy wybrany tile do którego chcemy dodać warstwę kolizji
-   Co istotne, możemy kolizje kształtować tak aby dopasować do grafiki np. skosu itp.


### Ograniczenie widoczności kamery gracza do sceny (tak aby nie widział co jest poza mapą)

-   Wchodzimy w scene gracza
-   Przechodzimy do Camera2D
-   Otwieramy sekcje "Limit"
-   Dla Left i Top dajemy po wartość 0

### Dodanie przeciwnika do gry