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
class JspConfiguration extends Base
{
    /**
     * @param  {model.configuration.GlobalConfiguration} globalConfiguration
     */
    constructor(globalConfiguration)
    {
        super();

        //Check params
        assertParameter(this, 'globalConfiguration', globalConfiguration, true, GlobalConfiguration);

        // Create configuration
        this._exportPath = globalConfiguration.get('jsp.exportPath', '${cache}/fluid/export');
        this._builtinViewHelperNamespace = globalConfiguration.get('jsp.builtinViewHelperNamespace', 'f');
        this._entojViewHelperNamespace = globalConfiguration.get('jsp.entojViewHelperNamespace', 'e');
        this._assetsBaseUrl = globalConfiguration.get('jsp.assetsBaseUrl', '');
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
        return 'configuration/JspConfiguration';
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
     * The namespace used to adress entoj view helpers
     *
     * @type {String}
     */
    get entojViewHelperNamespace()
    {
        return this._entojViewHelperNamespace;
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
module.exports.JspConfiguration = JspConfiguration;
