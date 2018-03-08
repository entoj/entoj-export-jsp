'use strict';

/**
 * Requirements
 * @ignore
 */
const JspExporter = require('../export/JspExporter.js').JspExporter;
const ExportTask = require('entoj-system').task.ExportTask;
const EntitiesRepository = require('entoj-system').model.entity.EntitiesRepository;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const CliLogger = require('entoj-system').cli.CliLogger;


/**
 * @memberOf task
 */
class JspExportTask extends ExportTask
{
    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [CliLogger, EntitiesRepository, GlobalRepository, JspExporter] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'task/JspExportTask';
    }


    /**
     * @inheritDoc
     */
    get sectionName()
    {
        return 'Exporting Jsp files';
    }


    /**
     * @inheritDoc
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
