## Dodanie do PATH

```bash
cd # przejście do katalogu domowego
vim .zshrc # może być coś innego niż vim, np. nano
```

Dodajemy do pliku export do zmiennej PATH

```bash
# gdzie /opt/homebrew/bin może być inną ścieżką, lub kolekcją ścieżek
export PATH=$PATH:/opt/homebrew/bin
```

zapisujemy i gotowe!

## Dodanie GIT'a

W konsoli wywołujemy

```bash
git --version
```

samo to wywołanie spowoduje instalacje pakietu zawierającego git'a!
