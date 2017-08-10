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
        this._configurationName = globalConfiguration.get(prefix + '.configurationName', 'jsp');
        this._exportPath = globalConfiguration.get(prefix + '.exportPath', '${cache}/'+ prefix + '/export');
        this._builtinViewHelperNamespace = globalConfiguration.get(prefix + '.builtinViewHelperNamespace', 'f');
        this._localViewHelperNamespace = globalConfiguration.get(prefix + '.localViewHelperNamespace', 'e');
        this._assetsBaseUrl = globalConfiguration.get(prefix + '.assetsBaseUrl', '');
        this._imageBaseUrl = globalConfiguration.get(prefix + '.imageBaseUrl', '');
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
     * The namespace used to adress built in view helpers (f -> name())
     *
     * @type {String}
     */
    get builtinViewHelperNamespace()
    {
        return this._builtinViewHelperNamespace;
    }


    /**
     * The namespace used to adress local (entoj) view helpers
     *
     * @type {String}
     */
    get localViewHelperNamespace()
    {
        return this._localViewHelperNamespace;
    }


    /**
     * The base path for assets - used by assetUrl filter
     *
     * @type {String}
     */
    get assetsBaseUrl()
    {
        return this._assetsBaseUrl;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspModuleConfiguration = JspModuleConfiguration;
