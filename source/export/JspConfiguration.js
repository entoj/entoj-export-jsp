'use strict';

// Requirements
const Configuration = require('entoj-system').export.Configuration;
const JspModuleConfiguration = require('../configuration/JspConfiguration.js').JspConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;


/**
 * @memberOf export.fluid
 * @extends export.Configuration
 */
class JspConfiguration extends Configuration
{
    /**
     * @ignore
     */
    constructor(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, jspConfiguration)
    {
        super(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration);

        // Check params
        assertParameter(this, 'fluidConfiguration', jspConfiguration, true, JspModuleConfiguration);

        // Assign options
        this._jspConfiguration = jspConfiguration;
        this._identifier = 'jsp';
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/JspConfiguration';
    }


    /**
     * @type {configuration.JspConfiguration}
     */
    get jspConfiguration()
    {
        return this._jspConfiguration;
    }


    /**
     * @inheritDocs
     */
    refineMacroConfiguration(configuration)
    {
        configuration.jsp = this.jspConfiguration;
        configuration.filename = 'includes/' + configuration.entity.id.category.pluralName + '/' + configuration.macro.name.replace(/_/g, '-') + '.jsp';
        return Promise.resolve(configuration);
    }
}


// Exports
module.exports.JspConfiguration = JspConfiguration;
