
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

#Entoj jsp export Library


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
## Filters
Ok |assetUrl
Ok |default
Ok |empty
Ok |notempty
OK |length
Nop |load
Ok |moduleClasses
Ok |translate

## Excluded
|mediaQuery
|imageUrl
|linkUrl
|unique
|attributes
|settings
|date
|markup
|htmlencode
|metadata
|setProperty
|svgUrl
|svgViewBox

## Custom
|linkType
|hyphenate
|navigationClass


---

### Licence
[Apache License 2.0](LICENCE)

[travis-image]: https://img.shields.io/travis/entoj/entoj-export-jsp/master.svg?label=linux
[travis-url]: https://travis-ci.org/entoj/entoj-export-jsp
[appveyor-image]: https://img.shields.io/appveyor/ci/ChristianAuth/entoj-export-jsp/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/ChristianAuth/entoj-export-jsp
[coveralls-image]: https://img.shields.io/coveralls/entoj/entoj-export-jsp/master.svg
[coveralls-url]: https://coveralls.io/r/entoj/entoj-export-jsp?branch=master
