'use strict';

/**
 * Requirements
 * @ignore
 */
const Base = require('entoj-system').Base;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;
const GlobalConfiguration = require('entoj-system').model.configuration.GlobalConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;


/**
 * @memberOf configuration
 */
class JspModuleConfiguration extends Base
{
    /**
     * @param {model.configuration.GlobalConfiguration} globalConfiguration
     * @param {model.configuration.BuildConfiguration} buildConfiguration
     * @param {Object} options
     */
    constructor(globalConfiguration, buildConfiguration, options)
    {
        super();

        //Check params
        assertParameter(this, 'globalConfiguration', globalConfiguration, true, GlobalConfiguration);
        assertParameter(this, 'buildConfiguration', buildConfiguration, true, BuildConfiguration);

        // Create configuration
        const prefix = options
            ? options.prefix || 'jsp'
            : 'jsp';
        this._configurationName = buildConfiguration.get(prefix + '.configurationName', globalConfiguration.get(prefix + '.configurationName', prefix));
        this._exportPath = buildConfiguration.get(prefix + '.exportPath', globalConfiguration.get(prefix + '.exportPath', '${cache}/${configurationName}/export'));
        this._basePathTemplate = buildConfiguration.get(prefix + '.basePathTemplate', globalConfiguration.get(prefix + '.basePathTemplate', ''));
        this._includePathTemplate = buildConfiguration.get(prefix + '.includePathTemplate', globalConfiguration.get(prefix + '.includePathTemplate', '/'));
        this._globalFilePathTemplate = buildConfiguration.get(prefix + '.globalFilePathTemplate', globalConfiguration.get(prefix + '.globalFilePathTemplate', 'includes/helper'));
        this._globalIncludePathTemplate = buildConfiguration.get(prefix + '.globalIncludePathTemplate', globalConfiguration.get(prefix + '.globalIncludePathTemplate', '/includes/helper'));
        this._entityPathTemplate = buildConfiguration.get(prefix + '.entityPathTemplate', globalConfiguration.get(prefix + '.entityPathTemplate', '${basePathTemplate}${basePathTemplate ? "/" : ""}includes/${entityCategory.pluralName.urlify()}'));
        this._entityFilenameTemplate = buildConfiguration.get(prefix + '.entityFilenameTemplate', globalConfiguration.get(prefix + '.entityFilenameTemplate', '${basePathTemplate}${basePathTemplate ? "/" : ""}includes/${entityId.idString.urlify()}'));
        this._entityMacroFilenameTemplate = buildConfiguration.get(prefix + '.entityMacroFilenameTemplate', globalConfiguration.get(prefix + '.entityMacroFilenameTemplate', '${macro.name.urlify().dasherize()}'));
        this._viewHelperNamespace = buildConfiguration.get(prefix + '.viewHelperNamespace', globalConfiguration.get(prefix + '.viewHelperNamespace', 'entoj'));
        this._viewHelperUri = buildConfiguration.get(prefix + '.viewHelperUri', globalConfiguration.get(prefix + '.viewHelperUri', 'https://entoj.io/entoj'));
        this._assetBaseUrl = buildConfiguration.get(prefix + '.assetBaseUrl', globalConfiguration.get(prefix + '.assetBaseUrl', ''));
        this._svgBaseUrl = buildConfiguration.get(prefix + '.svgBaseUrl', globalConfiguration.get(prefix + '.svgBaseUrl', ''));
        this._svgBasePath = buildConfiguration.get(prefix + '.svgBasePath', globalConfiguration.get(prefix + '.svgBasePath', ''));
        this._imageBaseUrl = buildConfiguration.get(prefix + '.imageBaseUrl', globalConfiguration.get(prefix + '.imageBaseUrl', ''));
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration, BuildConfiguration, 'configuration/JspModuleConfiguration.options'] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'configuration/JspModuleConfiguration';
    }


    /**
     * Provides variables to use in path resolving
     *
     * @type {Object}
     */
    get variables()
    {
        return {
            configurationName: this._configurationName
        };
    }


    /**
     * The name of the export configurations for entities.
     *
     * @type {String}
     */
    get configurationName()
    {
        return this._configurationName;
    }


    /**
     * The path to the folder where files are exported to
     *
     * @type {String}
     */
    get exportPath()
    {
        return this._exportPath;
    }


    /**
     * Template for generating the base path for exports (relative to exportPath)
     *
     * @type {String}
     */
    get basePathTemplate()
    {
        return this._basePathTemplate;
    }


    /**
     * Template for generating the base path for includes
     *
     * @type {String}
     */
    get includePathTemplate()
    {
        return this._includePathTemplate;
    }


    /**
     * Template for generating the base path for global exports (relative to exportPath)
     *
     * @type {String}
     */
    get globalFilePathTemplate()
    {
        return this._globalFilePathTemplate;
    }


    /**
     * Template for generating the include path for global exports
     *
     * @type {String}
     */
    get globalIncludePathTemplate()
    {
        return this._globalIncludePathTemplate;
    }


    /**
     * Template for generating the entity export path (relative to basePathTemplate)
     *
     * @type {String}
     */
    get entityPathTemplate()
    {
        return this._entityPathTemplate;
    }


    /**
     * Template for generating a entity filename (relative to entityPathTemplate)
     *
     * @type {String}
     */
    get entityFilenameTemplate()
    {
        return this._entityFilenameTemplate;
    }


    /**
     * Template for generating a entity macro filename (relative to entityPathTemplate)
     *
     * @type {String}
     */
    get entityMacroFilenameTemplate()
    {
        return this._entityMacroFilenameTemplate;
    }


    /**
     * The namespace used to adress view helpers
     *
     * @type {String}
     */
    get viewHelperNamespace()
    {
        return this._viewHelperNamespace;
    }


    /**
     * The uri used for the view helpers
     *
     * @type {String}
     */
    get viewHelperUri()
    {
        return this._viewHelperUri;
    }


    /**
     * The base url for images - used by imageUrl filter
     *
     * @type {String}
     */
    get imageBaseUrl()
    {
        return this._imageBaseUrl;
    }


    /**
     * The base url for assets - used by assetUrl filter
     *
     * @type {String}
     */
    get assetBaseUrl()
    {
        return this._assetBaseUrl;
    }


    /**
     * The base path for svg icons - used by svgViewBox filter renderer
     *
     * @type {String}
     */
    get svgBasePath()
    {
        return this._svgBasePath;
    }


    /**
     * The base path for svg icons - used by svgUrl filter
     *
     * @type {String}
     */
    get svgBaseUrl()
    {
        return this._svgBaseUrl;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspModuleConfiguration = JspModuleConfiguration;
