
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Entoj JSP Export

## Features

### JspExportCommand

A jsp artefact exporter. For detailed configuration see the [Configuration](#Configuration) section below.

#### Configuration

```javascript
configuration.commands.push(
	{
		type: require('entoj-export-jsp').command.JspExportCommand
	});
```

## Configuration

### Global

```javascript
// Full featured Example
configuration.settings =
{
	jsp:
	{
		exportPath: '${cache}/export',
		jspBasePath: 'includes',
		jspBaseUrl: '/includes',
		assetBaseUrl: '/assets/base',
		svgBaseUrl: '/assets/base/icons',
		svgBasePath: '/base/global/assets/icons',
		viewHelperUri: 'http://foo.com/bar',
		viewHelperNamespace: 'bar'
    }
};
```


### Build environments

```javascript
// Full featured Example
configuration.build.environments.staging =
{
	jsp:
	{
		exportPath: '${cache}/export',
		jspBasePath: 'includes',
		jspBaseUrl: '/includes',
		assetBaseUrl: '/assets/base',
		svgBaseUrl: '/assets/base/icons',
		svgBasePath: '/base/global/assets/icons',
		viewHelperUri: 'http://foo.com/bar',
		viewHelperNamespace: 'bar'
	}
};
```


### Options

#### jsp.exportPath

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** `${cache}/${configurationName}/export`

The base path used to store exported artefacts. Standard directories may be used as variables.


#### jsp.jspBasePath

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** `includes`

The base path used to store exported jsp artefacts. This is relative to [jsp.exportPath](#jsp.exportPath).


#### jsp.jspIncludePath

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** `/includes`

The base url used to include jsp artefacts.


#### jsp.imageBaseUrl

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** ``

Used as the base url for rendering |imageUrl filters


#### jsp.assetBaseUrl

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** ``

Used as the base url for rendering |assetUrl filters


#### jsp.svgBaseUrl

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** ``

Used as the base url for rendering |svgUrl filters


#### jsp.svgBasePath

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** ``

Used as the base path for reading svg icons needed to render |svgViewBox filters


#### jsp.viewHelperUri

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** `https://entoj.io/entoj`

Used as the uri for the main view helper registration


#### jsp.viewHelperNamespace

* **Type:** `String`
* **Global:** Yes
* **Environment:** Yes
* **Default:** `entoj`

Used as the namespace for the main view helper registration



## Artefact export

```javascript
// Full featured Example
{
	"export":
	{
        "settings":
        {
            "jsp":
            {
                "parameters": [],
                "mode": inline,
                "mapping":
                {
                    "variables":
                    {
                        "name": "value"
                    }
                }
            }
        },
        "jsp":
        [
            {
                "macro": "name",
                "filename": "name",
                "parameters": [],
                "mode": inline,
                "mapping":
                {
                    "variables":
                    {
                        "name": "value"
                    }
                },
                "settings":
                {
                    "macro":
                    {
                        "arguments": [],
                        "mode": inline,
                        "mapping":
                        {
                            "variables":
                            {
                                "name": "value"
                            }
                        }
                    }
                }
            }
        ]
	}
}
```

### Options

#### macro

* **Type:** `String`
* **export.settings.jsp:** Yes
* **export.jsp[]:** Yes
* **export.jsp[].settings:** Yes
* **Default:** The main macro of the entity

Defines the macro that will be exported.


#### filename

* **Type:** `String`
* **export.settings.jsp:** No
* **export.jsp[]:** Yes
* **export.jsp[].settings:** No
* **Default:** `${includePath}/${categoryName}/${macroName}.jsp` or `${includePath}/${categoryName}/${entityId}.jsp`

Change the name of the exported macro. The .jsp extensions is added automatically. When no path is specified the default path (the categroy plural name in lowercase) is prepended.


#### mode

* **Type:** `Enum[include|inline]`
* **export.settings.jsp:** Yes
* **export.jsp[]:** No
* **export.jsp[].settings:** Yes
* **Default:** `include`

Defines if the macro will be included or inlined when called.


#### parameters

* **Type:** `Array`
* **export.settings.jsp:** Yes
* **export.jsp[]:** Yes
* **export.jsp[].settings:** No
* **Default:** `[]`

Allows to specify parameter default values for macros. This only applies to exporting full macros. If you want to change the arguments of a macro call please see #arguments


#### arguments

* **Type:** `Array`
* **export.settings.jsp:** No
* **export.jsp[]:** No
* **export.jsp[].settings:** Yes
* **Default:** `[]`

Allows to specify arguments that will be used when calling macros.


#### mapping.variables

* **Type:** `Object`
* **export.settings.jsp:** No
* **export.jsp[]:** Yes
* **export.jsp[].settings:** Yes
* **Default:** `[]`

Allows to override specific settings for macro calls within the exported macro.


## Running tests

### Run all test specs at once

```
npm test
```

### Run all tests matching the given regex

```
npm test -- --grep model/
```

### Enable logging while running tests

```
npm test --vvvv
```

### Run all tests and shows test coverage

```
npm run coverage
```

### Lint all source files

```
npm run lint
```


---

### Licence
[Apache License 2.0](LICENCE)

[travis-image]: https://img.shields.io/travis/entoj/entoj-export-jsp/master.svg?label=linux
[travis-url]: https://travis-ci.org/entoj/entoj-export-jsp
[appveyor-image]: https://img.shields.io/appveyor/ci/ChristianAuth/entoj-export-jsp/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/ChristianAuth/entoj-export-jsp
[coveralls-image]: https://img.shields.io/coveralls/entoj/entoj-export-jsp/master.svg
[coveralls-url]: https://coveralls.io/r/entoj/entoj-export-jsp?branch=master
