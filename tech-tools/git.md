# GIT

## Check the most changed files in the system

```
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```