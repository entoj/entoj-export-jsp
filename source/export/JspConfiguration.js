'use strict';

// Requirements
const Configuration = require('entoj-system').export.Configuration;
const JspModuleConfiguration = require('../configuration/JspModuleConfiguration.js').JspModuleConfiguration;
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
    constructor(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, moduleConfiguration)
    {
        super(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration);

        // Check params
        assertParameter(this, 'moduleConfiguration', moduleConfiguration, true, JspModuleConfiguration);

        // Assign options
        this._moduleConfiguration = moduleConfiguration;
        this._identifier = moduleConfiguration.configurationName;
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
    get moduleConfiguration()
    {
        return this._moduleConfiguration;
    }


    /**
     * @inheritDocs
     */
    refineConfiguration(configuration)
    {
        configuration.moduleConfiguration = this.moduleConfiguration;
        if (this.settings.filename)
        {
            configuration.filename = '';
            if (this.settings.filename.indexOf('/') === -1)
            {
                configuration.filename+= 'includes/' + configuration.entity.id.category.pluralName + '/';
            }
            configuration.filename+= (this.settings.filename.substr(0, this.settings.filename.lastIndexOf('.')) || this.settings.filename);
        }
        else
        {
            configuration.filename = 'includes/' + configuration.entity.id.category.pluralName + '/';
            if (configuration.macro)
            {
                configuration.filename+= configuration.macro.name.replace(/_/g, '-');
            }
            else
            {
                configuration.filename+= configuration.entity.idString.replace(/_/g, '-');
            }
        }
        configuration.filename+= '.jsp';
        return Promise.resolve(configuration);
    }
}


// Exports
module.exports.JspConfiguration = JspConfiguration;
