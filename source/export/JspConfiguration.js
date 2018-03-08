'use strict';

// Requirements
const Configuration = require('entoj-system').export.Configuration;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;
const Parser = require('entoj-system').export.Parser;
const JspModuleConfiguration = require('../configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const JspRenderer = require('./JspRenderer.js').JspRenderer;
const JspTransformer = require('./JspTransformer.js').JspTransformer;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
const templateString = require('es6-template-strings');
const trim = require('lodash.trim');


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
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': ['export/JspConfiguration.entity', 'export/JspConfiguration.macro', 'export/JspConfiguration.settings',
            Parser, JspRenderer, JspTransformer, GlobalRepository, BuildConfiguration, JspModuleConfiguration] };
    }


    /**
     * @type {configuration.JspConfiguration}
     */
    get moduleConfiguration()
    {
        return this._moduleConfiguration;
    }


    /**
     * @inheritDoc
     */
    getMacroEntity(macro)
    {
        return this.globalRepository.resolveEntityForMacro(this.site, macro, true);
    }


    /**
     * @param {Object} configuration
     * @param {String} template
     * @param {Object} data
     */
    renderTemplate(configuration, template, data)
    {
        const templateData = Object.assign({}, data || {});
        if (configuration)
        {
            templateData.macro = configuration.macro;
            templateData.site = configuration.entity.id.site;
            templateData.entityCategory = configuration.entity.id.category;
            templateData.entityId = configuration.entity.id;
        }
        templateData.basePathTemplate = this.moduleConfiguration.basePathTemplate;
        return templateString(templateString(template, templateData), templateData);
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
                result.filename+= trim(this.renderTemplate(configuration, this.moduleConfiguration.entityPathTemplate), '/');
            }
            if (!result.filename.endsWith('/'))
            {
                result.filename+= '/';
            }
            if (result.filename.startsWith('/'))
            {
                result.filename = result.filename.substr(1);
            }
            result.filename+= (this.settings.filename.substr(0, this.settings.filename.lastIndexOf('.')) || this.settings.filename);
        }
        else
        {
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

        // Get includePath
        result.includePath = '/' + result.filename;

        return Promise.resolve(result);
    }
}


// Exports
module.exports.JspConfiguration = JspConfiguration;
