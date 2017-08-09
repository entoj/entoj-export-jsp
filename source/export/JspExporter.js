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
    constructor(globalRepository, buildConfiguration, jspModuleConfiguration, jspRenderer, jspTransformer)
    {
        super(globalRepository, buildConfiguration, new JinjaParser(), jspRenderer, jspTransformer);

        // Check params
        assertParameter(this, 'jspModuleConfiguration', jspModuleConfiguration, true, JspModuleConfiguration);

        // Assign options
        this._jspModuleConfiguration = jspModuleConfiguration;
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
    get jspModuleConfiguration()
    {
        return this._jspModuleConfiguration;
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
            this.globalRepository, this.buildConfiguration, this.jspModuleConfiguration);
    }
}


// Exports
module.exports.JspExporter = JspExporter;
