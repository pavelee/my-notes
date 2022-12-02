# Symfony

## handy commands

### print out all of th current configuration

```
php bin/console debug:config twig
```

### print out tree of example

```
php bin/console config:dump twig
```

### print out cache pool list

```
php bin/console cache:pool:list
```

### clear out cache from selected pool

```
php bin/console cache:pool:clear cache.app
```