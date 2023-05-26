# GIT

## Check the most changed files in the system

```
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```

## Ustawienie nazwy i maila użytkownika

```
git config user.name TWOJA_NAZWA
git config user.email TWOJ_EMAIL
```
