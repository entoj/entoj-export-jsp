'use strict';

/**
 * Requirements
 * @ignore
 */
const Base = require('entoj-system').Base;
const GlobalConfiguration = require('entoj-system').model.configuration.GlobalConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;


/**
 * @memberOf configuration
 */
class JspModuleConfiguration extends Base
{
    /**
     * @param  {model.configuration.GlobalConfiguration} globalConfiguration
     */
    constructor(globalConfiguration, options)
    {
        super();

        //Check params
        assertParameter(this, 'globalConfiguration', globalConfiguration, true, GlobalConfiguration);

        // Create configuration
        const prefix = options
            ? options.prefix || 'jsp'
            : 'jsp';
        this._configurationName = globalConfiguration.get(prefix + '.configurationName', prefix);
        this._exportPath = globalConfiguration.get(prefix + '.exportPath', '${cache}/'+ prefix + '/export');
        this._viewHelperNamespace = globalConfiguration.get(prefix + '.viewHelperNamespace', 'entoj');
        this._viewHelperUri = globalConfiguration.get(prefix + '.viewHelperUri', 'https://entoj.io/entoj');
        this._assetsBaseUrl = globalConfiguration.get(prefix + '.assetsBaseUrl', '');
        this._svgBaseUrl = globalConfiguration.get(prefix + '.svgBaseUrl', '');
        this._svgBasePath = globalConfiguration.get(prefix + '.svgBasePath', '');
        this._imageBaseUrl = globalConfiguration.get(prefix + '.imageBaseUrl', '');
        this._jspBasePath = globalConfiguration.get(prefix + '.jspBasePath', 'includes');
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration] };
    }


    /**
     * @inheritDocss
     */
    static get className()
    {
        return 'configuration/JspModuleConfiguration';
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
     * The base url for assets - used by assetUrl filter
     *
     * @type {String}
     */
    get assetsBaseUrl()
    {
        return this._assetsBaseUrl;
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


    /**
     * The base path for exported jsp artefacts
     *
     * @type {String}
     */
    get jspBasePath()
    {
        return this._jspBasePath;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspModuleConfiguration = JspModuleConfiguration;
