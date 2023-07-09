abstract class UIElement {}

// definiujemy abstrakcyjne produkty dla systemu
abstract class UIButton extends UIElement {}
abstract class UIInput extends UIElement {}

// abstrakcyjna fabryka
// deklaruje metody zwracające różne abstrakcyjne produkty ale z jednej rodziny
// rodzina w wspólny koncept, coś co powoduje że produkty są kompatybilne ze sobą
abstract class UIElementFactory {
    abstract createButton(): UIButton;
    abstract createInput(): UIInput;
}

// budujemy konkretne produkty dla rodziny
class MacOsUIButton extends UIButton {}
class MacOsUIInput extends UIInput {}

// definiujemy konkretną fabrykę, zwraca produkty konkretnej rodziny
class MacOsUIElementFactory extends UIElementFactory {
    createButton(): UIButton {
        let o = new MacOsUIButton();
        return o;
    }

    createInput(): UIInput {
        let o = new MacOsUIInput();
        return o;
    }
}

// analogicznie jak dla macOS mamy rodzinę Windows
class WindowsUIButton extends UIButton {}
class WindowsUIInput extends UIInput {}

// analogicznie mamy fabrykę Windows
class WindowsUIElementFactory extends UIElementFactory {
    createButton(): UIButton {
        let o = new WindowsUIButton();
        return o;
    }

    createInput(): UIInput {
        let o = new WindowsUIInput();
        return o;
    }
}

// ... i tak dalej, możemy definiować kolejne fabryki abstrakcyjne

let f: UIElementFactory; // mamy w systemie fabrykę

let config: "macos" | "windows";

// element konfigutacji sytemu, wybieramy fabrykę w zależności od parametru
config = "macos";
f = new MacOsUIElementFactory();
if (config.toString() == "windows") {
    f = new WindowsUIElementFactory();
}

// dalszy element aplikacji, niezależenie jaka jest fabryka to zadziałą i pozostaje niezmienne
let button: UIButton = f.createButton();
let input: UIInput = f.createInput();
