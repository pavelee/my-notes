https://www.youtube.com/watch?v=S8lMTwSRoRg

#### GitIgnore dla Godot

https://www.toptal.com/developers/gitignore/api/godot

```
# Created by https://www.toptal.com/developers/gitignore/api/godot
# Edit at https://www.toptal.com/developers/gitignore?templates=godot

### Godot ###
# Godot 4+ specific ignores
.godot/

# Godot-specific ignores
.import/
export.cfg
export_presets.cfg

# Imported translations (automatically generated from CSV files)
*.translation

# Mono-specific ignores
.mono/
data_*/
mono_crash.*.json

# End of https://www.toptal.com/developers/gitignore/api/godot
```

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

-   Dodajemy nową scenę
-   Dodajemy CharacterBody2D
    -   Dodajemy CollisionShape2D
        -   Ustawiamy kształt
    -   AnimatedShape2D
        -   ustawiany nowy spriteFrame
        -   dodajemy animacje do postaci: Idle, Jump, Death itp.
-   Dodajemy Area2D
    -   Dodajemy CollisionShape2D, kształt owalny
-   Do Area2D dodajemy node (zakładka węzeł) -> body_entered
-   Dodanie wykrywanie kolizji z graczem
    -   ```ts
            func _on_player_detection_body_entered(body):
                if body.name == "Player":
                    print("KOLIZJA")
        ```
-   Dodanie grawitacji do postaci
    -   ```ts
            func _physics_process(delta):
                if not is_on_floor():
                    velocity.y += gravity * delta
                move_and_slide()
        ```

#### Grupowanie obiektów po Node2d

Obiekty możemy grupować poprzez dodanie Node2D i następnie do niego już konkretnych postaci

#### Rozpoczęcie ruchu przeciwnika w kierunku gracza

-   Mozemy pobrać pozycje gracza poprzez:
    ```ts
    print(player.global_position);
    ```
-   Przykładowa implementacja "podążania" za graczem jak jest w obrębie Area2D

    -   ```ts
        extends CharacterBody2D

        func isPlayerJumpingUp():
            return velocity.y != 0

        func isPlayerFalling():
            return velocity.y > 0;

        func turnMobLeft():
            get_node("AnimatedSprite2D").flip_h = false

        func turnMobRight():
            get_node("AnimatedSprite2D").flip_h = true

        func getPlayerDirection():
            return Input.get_axis("ui_left", "ui_right")

        func isPlayerMovingLeft():
            return getPlayerDirection() == -1

        func isPlayerMovingRight():
            return getPlayerDirection() == 1

        func getAnimationSprite():
            return get_node("AnimatedSprite2D")

        func playAnimation(sprite, animation):
            sprite.play(animation);

        func playJump():
            playAnimation(getAnimationSprite(), 'Jump')

        func playIdle():
            playAnimation(getAnimationSprite(), 'Idle')

        func getPlayer():
            return get_node("../../Player/Player")

        func getObjectSideRelationDirection(node, node1):
            var direction = (node.position - node1.position).normalized()
            return direction;

        func getObjectSideRelationWithObject(node, node1):
            var direction = getObjectSideRelationDirection(node, node1)
            var directionString = 'left'
            if (direction.x > 0):
                return 'right';

        const SPEED = 50
        const JUMP_VELOCITY = -400.0

        # Get the gravity from the project settings to be synced with RigidBody nodes.
        var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
        var chase = false

        func _physics_process(delta):
            if not is_on_floor():
                velocity.y += gravity * delta

            if chase:
                playJump()
                var player = getPlayer()
                var isPlayerOnRight = getObjectSideRelationWithObject(player, self) == 'right'
                if isPlayerOnRight:
                    turnMobRight()
                else:
                    turnMobLeft()
                # start moving in player direction
                velocity.x = getObjectSideRelationDirection(player, self).x * SPEED
            else:
                # stop moving
                velocity.x = 0
                playIdle()

            move_and_slide()

        func _on_player_detection_body_entered(body):
            if body.name == "Player":
                chase = true

        func _on_player_detection_body_exited(body):
            if body.name == "Player":
                chase = false
        ```

#### Śmierć moba

-   Dodajemy kolejne Area2D z CollisionShape2d
-   Dodajemy kodzik na zdarzenie body_entered

    -   ```ts
        func waitUntilAnimationFinished(sprite):
            await sprite.animation_finished

        func playJump():
            # odpalamy animacje tylko w momencie jak nie jest aktualnie odpalona animacja smierci tak aby jej nie nadpisac
            if getAnimationSprite().animation != 'Death':
                playAnimation(getAnimationSprite(), 'Jump')

        func playIdle():
            # odpalamy animacje tylko w momencie jak nie jest aktualnie odpalona animacja smierci tak aby jej nie nadpisac
            if getAnimationSprite().animation != 'Death':
                playAnimation(getAnimationSprite(), 'Idle')

        func _on_player_death_body_entered(body):
            if body.name == "Player":
                # ustawiamy aby mob przestal juz podazac za graczem (jest martwy)
                chase = false
                # odpalamy animacje śmierci
                playDeath()
                # czekamy az skonczy sie animacja na sprite
                await waitUntilAnimationFinished(getAnimationSprite())
                # usuwamy moba z planszy
                self.queue_free()
        ```

#### Dodanie zdrowia gracza i zmiana tej wartości

-   Do gracza (skrypt) dodajemy zmienna przetrzymujaca zdrowie gracza
    -   ```ts
        var health = 10;
        ```

#### Dodanie UI do wyświetlania informacji dla gracza

-   Do sceny głównej dodajmy CanvasLayer
    -   Do tego dodajmy Label
    -   Do label dodajemy skrypt
        -   ```ts
            func _process(delta):
                text = "HP: " + str(getPlayer().health)
            ```
    -   właściwości wyświetlania label można ustawić w "Theme Overrides"

#### Śmierć gracza

    -   Dodajemy do moba nową Area2D z CollisionShape2D
    -   Dodajemy węzeł on_body_entered
    -   kodzik
        -   ```ts
            func death():
                # ustawiamy aby mob przestal juz podazac za graczem (jest martwy)
                chase = false
                # odpalamy animacje śmierci
                playDeath()
                # czekamy az skonczy sie animacja na sprite
                await waitUntilAnimationFinished(getAnimationSprite())
                # usuwamy moba z planszy
                self.queue_free()

            func _on_player_collision_body_entered(body):
                if body.name == "Player":
                    # zabranie graczowi zycie
                    (body as Player).health -= 3
                    death()
            ```
    -   Następnie do gracza dodajemy śmierć i koniec gry:
        -   ```ts
                if health <= 0:
                    queue_free();
                    get_tree().change_scene_to_file("res://main.tscn")
            ```

#### Globalne skrypty

Aby dodać skrypt globalny należy:

-   Wejść w ustawienia projektu
-   W sekcje "autoładowanie"
-   Dodać skrypt który ma być ładowany globalnie dla gry

#### Zapis i odczyt gry

-   Zapis i odczyt możemy wykonać poprzez zapis do pliku naszych danych np. w formacie json

```ts
extends Node

const SAVE_PATH = "res://savegame.json"

# in real world we shoulse use user://
# const SAVE_PATH = "user://savegame.bin"

func saveGame():
	# otwieramy plik do zapisu
	var file = FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	var data: Dictionary = {
		"playerHP": Game.playerHP,
		"gold": Game.gold
	}
	var js = JSON.stringify(data)
	file.store_line(js)
	file.close()

func loadGame():
	# otwieramy plik do odczytu
	var file = FileAccess.open(SAVE_PATH, FileAccess.READ);
	if FileAccess.file_exists(SAVE_PATH):
		var rawData = file.get_as_text()
		var data = JSON.parse_string(rawData)
		Game.playerHP = data['playerHP']
		Game.gold = data['gold']
		file.close()
```

#### Dodanie zbieralnych elementów w grze

-   Dodajemy nową scene z cherry
-   Dodajemy Area2D (bo będzie wykrywać kolizje z graczem)
    -   Dodajemy CollisionShape2D
        -   ustawiamy okrąg jako kształt
    -   Dodajemy

#### Dodanie tween do obiektu (wykonanie operacji zmiany parametrow w czasie np. przesuniecie, znikniecie itp)

```ts
func _on_body_entered(body):
	if body.name == "Player":
		Game.gold += 1
		# tworzymy dwa teeny tak aby mogły się wykonać jednoczesnie, inaczej zostana wykonane jeden po drugim
		var tween = get_tree().create_tween()
		var tween1 = get_tree().create_tween()
		# efekt przesuniecia do gory
		tween.tween_property(self, 'position', position - Vector2(0, 50), 0.5)
		# efekt zanikania (opacity)
		tween1.tween_property(self, 'modulate:a', 0, 0.5)
		# element zostanie finlanie usuniety z mapy
		tween.tween_callback(queue_free)
```

#### Dodanie timera do gry (czasowe wywołanie itp)

-   Możemy to zrobić poprzez dodanie Node: "Timer"
-   Następnie na nim ustawiamy węzeł: "\_on_timer_timeout" i podpinamy pod wybrany node który ma reagować na to

#### Dodawanie dynamicznie elementów do sceny

Przykład:

```ts
# pobieramy zrodlo elementu np. postaci
var cherry: PackedScene = preload("res://cherry.tscn")

func _on_timer_timeout():
	# iniciujemy
	var c: Cherry = cherry.instantiate()
	# ustawiamy parametry, w tym przypadku pozycje
	c.position = Vector2(200, 300)
	# dodajemy do node
	add_child(c)

    # mozemy tez dodac do wybranego node
	# get_node(TWOJ_NODE).add_child(c)
```

#### Generowanie randowowych wartosci

```ts
	# tworzymy generator
	var random = RandomNumberGenerator.new()
	# pobieramy randowe liczby
	var randomX = random.randi_range(200, 500)
	var randomY = random.randi_range(300, 315)
```
