abstract class UIElementFactory {
    protected name: string = 'test';
}

class Dupa extends UIElementFactory {
    dupaSiie() {
        return this.name;
    }
}