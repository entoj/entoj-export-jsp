'use strict';

// Requirements
const Exporter = require('entoj-system').export.Exporter;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;
const JinjaParser = require('entoj-system').export.parser.JinjaParser;
const JspRenderer = require('./JspRenderer.js').JspRenderer;
const JspTransformer = require('./JspTransformer.js').JspTransformer;
const JspConfiguration = require('./JspConfiguration.js').JspConfiguration;
const JspModuleConfiguration = require('../configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;


/**
 * @memberOf export
 * @extends export.Renderer
 */
class JspExporter extends Exporter
{
    /**
     * @ignore
     */
    constructor(globalRepository, buildConfiguration, moduleConfiguration, renderer, transformer)
    {
        super(globalRepository, buildConfiguration, new JinjaParser(), renderer, transformer);

        // Check params
        assertParameter(this, 'moduleConfiguration', moduleConfiguration, true, JspModuleConfiguration);

        // Assign options
        this._moduleConfiguration = moduleConfiguration;
        this._configurationClass = JspConfiguration;
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/JspExporter';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [GlobalRepository, BuildConfiguration, JspModuleConfiguration, JspRenderer, JspTransformer] };
    }


    /**
     * @type {configuration.JspModuleConfiguration}
     */
    get moduleConfiguration()
    {
        return this._moduleConfiguration;
    }


    /**
     * @protected
     * @param {model.entity.EntityAspect} entity
     * @param {model.documentation.DocumentationCallable} macro
     * @param {Object} settings
     * @returns {Configuration}
     */
    createConfigurationInstance(entity, macro, settings)
    {
        return new this._configurationClass(entity, macro, settings,
            this.parser, this.renderer, this.transformer,
            this.globalRepository, this.buildConfiguration, this.moduleConfiguration);
    }
}


// Exports
module.exports.JspExporter = JspExporter;
