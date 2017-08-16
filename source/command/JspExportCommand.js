'use strict';

/**
 * Requirements
 * @ignore
 */
const ExportCommand = require('entoj-system').command.ExportCommand;
const Context = require('entoj-system').application.Context;
const JspExportTask = require('../task/JspExportTask.js').JspExportTask;
const JspModuleConfiguration = require('../configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const BeautifyHtmlTask = require('entoj-html').task.BeautifyHtmlTask;


/**
 * @memberOf command
 */
class JspExportCommand extends ExportCommand
{
    /**
     */
    constructor(context)
    {
        super(context);

        // Assign options
        this._exportName = 'jsp';
        this._moduleConfigurationClass = JspModuleConfiguration;
        this._exportTaskClass = JspExportTask;
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [Context] };
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'command/JspExportCommand';
    }


    /**
     * @inheritDocs
     */
    addTasks(task, mapping)
    {
        if (!task)
        {
            return Promise.resolve();
        }
        return Promise.resolve(task.pipe(this.context.di.create(BeautifyHtmlTask, mapping)));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspExportCommand = JspExportCommand;
