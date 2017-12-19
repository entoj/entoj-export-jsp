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
        const result = configuration;
        result.moduleConfiguration = this.moduleConfiguration;
        if (this.settings.filename)
        {
            result.filename = '';
            if (this.settings.filename.indexOf('/') === -1)
            {
                result.filename+= this.moduleConfiguration.jspBasePath + '/' + result.entity.id.category.pluralName.urlify() + '/';
            }
            result.filename+= (this.settings.filename.substr(0, this.settings.filename.lastIndexOf('.')) || this.settings.filename);
        }
        else
        {
            result.filename = this.moduleConfiguration.jspBasePath + '/' + result.entity.id.category.pluralName.urlify() + '/';
            if (result.macro)
            {
                result.filename+= result.macro.name.replace(/_/g, '-');
            }
            else
            {
                result.filename+= result.entity.idString.replace(/_/g, '-');
            }
        }
        if (!result.filename.endsWith('.jsp'))
        {
            result.filename+= '.jsp';
        }

        // ?? Needed ??
        if (this.settings.includePath)
        {
            result.includePath = '';
            if (this.settings.includePath.indexOf('/') === -1)
            {
                result.includePath+= this.moduleConfiguration.jspIncludePath + '/' + result.entity.id.category.pluralName.urlify() + '/';
            }
            result.includePath+= (this.settings.includePath.substr(0, this.settings.includePath.lastIndexOf('.')) || this.settings.includePath);
        }
        else
        {
            result.includePath = this.moduleConfiguration.jspIncludePath + '/' + result.entity.id.category.pluralName.urlify() + '/';
            if (result.macro)
            {
                result.includePath+= result.macro.name.replace(/_/g, '-');
            }
            else
            {
                result.includePath+= result.entity.idString.replace(/_/g, '-');
            }
        }
        if (!result.includePath.endsWith('.jsp'))
        {
            result.includePath+= '.jsp';
        }

        return Promise.resolve(result);
    }
}


// Exports
module.exports.JspConfiguration = JspConfiguration;
