'use strict';

// Requirements
const Configuration = require('entoj-system').export.Configuration;
const JspModuleConfiguration = require('../configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
const templateString = require('es6-template-strings');
const trim = require('lodash.trim');
const trimEnd = require('lodash.trimend');


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
     * @param {Object} configuration
     * @param {String} template
     * @param {Object} data
     */
    renderTemplate(configuration, template, data)
    {
        const templateData = Object.assign({}, data || {});
        templateData.macro = configuration.macro;
        templateData.site = configuration.entity.id.site;
        templateData.entityCategory = configuration.entity.id.category;
        templateData.entityId = configuration.entity.id;
        return templateString(template, templateData);
    }


    /**
     * @inheritDoc
     */
    refineConfiguration(configuration)
    {
        const result = configuration;
        result.moduleConfiguration = this.moduleConfiguration;

        // Determine full path to file
        result.filename = '';
        if (this.settings.filename)
        {
            if (this.settings.filename.indexOf('/') === -1)
            {
                result.filename+= trimEnd(this.moduleConfiguration.jspBasePath, '/');
                result.filename+= '/';
                result.filename+= trim(this.renderTemplate(configuration, this.moduleConfiguration.entityPathTemplate), '/');
            }
            if (!result.filename.endsWith('/'))
            {
                result.filename+= '/';
            }
            result.filename+= (this.settings.filename.substr(0, this.settings.filename.lastIndexOf('.')) || this.settings.filename);
        }
        else
        {
            result.filename+= trimEnd(this.moduleConfiguration.jspBasePath, '/');
            result.filename+= '/';
            result.filename+= trim(this.renderTemplate(configuration, this.moduleConfiguration.entityPathTemplate), '/');
            result.filename+= '/';
            if (result.macro)
            {
                result.filename+= this.renderTemplate(configuration, this.moduleConfiguration.entityMacroFilenameTemplate);
            }
            else
            {
                result.filename+= this.renderTemplate(configuration, this.moduleConfiguration.entityFilenameTemplate);
            }
        }
        if (!result.filename.endsWith('.jsp'))
        {
            result.filename+= '.jsp';
        }

        // Determine includePath
        result.includePath = result.filename;
        if (result.includePath.startsWith(this.moduleConfiguration.jspBasePath))
        {
            result.includePath = result.includePath.substr(this.moduleConfiguration.jspBasePath.length);
        }
        result.includePath = this.moduleConfiguration.jspIncludePath + result.includePath;

        return Promise.resolve(result);
    }
}


// Exports
module.exports.JspConfiguration = JspConfiguration;
