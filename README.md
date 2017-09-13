
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Entoj JSP export


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

## Configuration

### Global

```javascript
// Global settings
configuration.settings =
{
    jsp:
    {
    	exportPath: '${cache}/export',
		jspBasePath: 'includes',
        assetBaseUrl: '/assets/base',
        svgBaseUrl: '/assets/base/icons',
        svgBasePath: '/base/global/assets/icons',
        viewHelperUri: 'http://foo.com/bar',
        viewHelperNamespace: 'bar'
    }
};
```

#### jsp.exportPath

The default base path used to store exported artefacts. Standard directories can be used as variables.


#### jsp.jspBasePath

The default path used to store exported jsp artefacts. This is relative to cm.exportPath.

#### jsp.assetBaseUrl

Used as the base url for rendering |assetUrl filters

#### jsp.svgBaseUrl

Used as the base url for rendering |svgUrl filters

#### jsp.svgBasePath

Used as the base path for reading svg icons needed to render |svgViewBox filters

#### jsp.viewHelperUri

Used as the uri for the main view helper registration

#### jsp.viewHelperNamespace

Used as the namespace for the main view helper registration


### Build environments

All settings from the [system configuration](##System) are overridable for each environment:

```javascript
// Staging
configuration.build.environments.staging =
{
	jsp:
	{
		exportPath: '${cache}/export',
		jspBasePath: 'includes',
		assetBaseUrl: '/assets/base',
		svgBaseUrl: '/assets/base/icons',
		svgBasePath: '/base/global/assets/icons',
		viewHelperUri: 'http://foo.com/bar',
		viewHelperNamespace: 'bar'
	}
};
```


### Entity settings

```json
{
	"export":
	{
		"settings":
		{
			"jsp":
			{
			}
		}
		"jsp":
		[
			{
				"macro": "e_cta_linkable",
				"filename": "e-cta",
				"arguments":
				{
					"classes": "custom-1"
				},
				"settings":
				{
					"e_headline":
					{
						"arguments":
						{
							"classes": "custom-1"
						}
					}
				}
			}
		]
	}
}
```

#### export.jsp[].macro

Used to select the macro that should get exported. Defaults to the main macro.

#### export.jsp[].filename

Change the name of the exported macro. The .jsp extensions is added automatically. When no path is specified the default path (the categroy plural name in lowercase) is prepended.

#### export.jsp[].arguments

Allows to specify argument presets for macros. This only applies to exporting full macros. If you want to change the arguments of a macro call please use [export.jsp[].settings](#### export.jsp[].settings)

#### export.jsp[].settings

Allows to override specific settings for macro calls within the exported macro.


## View helpers

### Supported
#### assetUrl
#### attributes
#### default
#### empty
#### formatDate
#### linkUrl
#### imageUrl
#### length
#### markup
#### mediaQuery
#### moduleClasses
#### notempty
#### set/setProperty
#### svgUrl
#### svgViewBox
#### translate
#### unique
#### load

### Unsupported
#### settings
#### metadata
#### hyphenate

---

### Licence
[Apache License 2.0](LICENCE)

[travis-image]: https://img.shields.io/travis/entoj/entoj-export-jsp/master.svg?label=linux
[travis-url]: https://travis-ci.org/entoj/entoj-export-jsp
[appveyor-image]: https://img.shields.io/appveyor/ci/ChristianAuth/entoj-export-jsp/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/ChristianAuth/entoj-export-jsp
[coveralls-image]: https://img.shields.io/coveralls/entoj/entoj-export-jsp/master.svg
[coveralls-url]: https://coveralls.io/r/entoj/entoj-export-jsp?branch=master
