'use strict';

/**
 * Requirements
 * @ignore
 */
const JspExporter = require('../export/JspExporter.js').JspExporter;
const ExportTask = require('entoj-system').task.ExportTask;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const CliLogger = require('entoj-system').cli.CliLogger;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;


/**
 * @memberOf task
 */
class JspExportTask extends ExportTask
{
    /**
     * @param {cli.CliLogger} cliLogger
     * @param {model.GlobalRepository} globalRepository
     */
    constructor(cliLogger, globalRepository, buildConfiguration, JspExporter)
    {
        super(cliLogger, globalRepository, JspExporter);
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [CliLogger, GlobalRepository, BuildConfiguration, JspExporter] };
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'task/JspExportTask';
    }


    /**
     * @inheritDocs
     */
    get sectionName()
    {
        return 'Exporting Jsp files';
    }


    /**
     * @inheritDocs
     */
    get exportName()
    {
        return 'jsp';
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspExportTask = JspExportTask;
