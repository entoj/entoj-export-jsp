
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

#Entoj cm export Library


## Running tests

Runs all test specs at once
```
npm test
```

Runs all test matching the given regex
```
npm test -- --grep model/
```

Enables logging while running tests
```
npm test -- --vvvv
```

Runs all test specs and shows test coverage
```
npm run coverage
```

Lints all source files
```
npm run lint
```

# Export

```
{
    "export":
    {
        "cm":
        [
            {
                "macro": "e_cta_linkable", // Macro name
                "view": "e-cta",
                "type": "",
                "variant": "",
                "settings":
                {
                    "view":
                    {
                        "e_cta": "asCTADefault"
                    }
                }
            }
        ]
    }
}
```


---

### Licence
[Apache License 2.0](LICENCE)

[travis-image]: https://img.shields.io/travis/entoj/entoj-export-cm/master.svg?label=linux
[travis-url]: https://travis-ci.org/entoj/entoj-export-cm
[appveyor-image]: https://img.shields.io/appveyor/ci/ChristianAuth/entoj-export-cm/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/ChristianAuth/entoj-export-cm
[coveralls-image]: https://img.shields.io/coveralls/entoj/entoj-export-cm/master.svg
[coveralls-url]: https://coveralls.io/r/entoj/entoj-export-cm?branch=master
