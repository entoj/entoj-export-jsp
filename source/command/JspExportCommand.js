'use strict';

/**
 * Requirements
 * @ignore
 */
const Command = require('entoj-system').command.Command;
const Context = require('entoj-system').application.Context;
const JspExportTask = require('../task/JspExportTask.js').JspExportTask;
const JspConfiguration = require('../configuration/JspConfiguration.js').JspConfiguration;
const BeautifyHtmlTask = require('entoj-html').task.BeautifyHtmlTask;
const WriteFilesTask = require('entoj-system').task.WriteFilesTask;
const DecorateTask = require('entoj-system').task.DecorateTask;
const PathesConfiguration = require('entoj-system').model.configuration.PathesConfiguration;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;
const ErrorHandler = require('entoj-system').error.ErrorHandler;
const CliLogger = require('entoj-system').cli.CliLogger;
const co = require('co');
const gitRev = require('git-rev-promises');


/**
 * @memberOf command
 */
class JspExportCommand extends Command
{
    /**
     */
    constructor(context)
    {
        super(context);

        // Assign options
        this._name = ['export'];
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
    get help()
    {
        const help =
        {
            name: this._name,
            description: 'Exports templates as fluid files',
            actions:
            [
                {
                    name: 'fluid',
                    description: 'Exports templates as fluid files',
                    options:
                    [
                        {
                            name: 'query',
                            type: 'inline',
                            optional: true,
                            defaultValue: '*',
                            description: 'Query for sites to use e.g. /base'
                        },
                        {
                            name: 'destination',
                            type: 'named',
                            value: 'path',
                            optional: true,
                            defaultValue: '',
                            description: 'Define a base folder where fluid files are written to'
                        }
                    ]
                }
            ]
        };
        return help;
    }


    /**
     * Exports templaes as fluid files
     *
     * @returns {Promise}
     */
    fluid(parameters)
    {
        const scope = this;
        const promise = co(function *()
        {
            const logger = scope.createLogger('command.export.fluid');
            const mapping = new Map();
            mapping.set(CliLogger, logger);
            const pathesConfiguration = scope.context.di.create(PathesConfiguration);
            const fluidConfiguration = scope.context.di.create(JspConfiguration);
            const buildConfiguration = scope.context.di.create(BuildConfiguration);
            let prepend = false;
            if (buildConfiguration.get('export.banner', false))
            {
                prepend = '/** ' + buildConfiguration.get('export.banner', false) + ' **/';
            }
            const options =
            {
                writePath: yield pathesConfiguration.resolve((parameters && parameters.destination) || fluidConfiguration.exportPath),
                query: parameters && parameters._ && parameters._[0] || '*',
                decorateVariables:
                {
                    date: new Date(),
                    gitHash: yield gitRev.long(),
                    gitBranch: yield gitRev.branch()
                },
                decoratePrepend: prepend
            };
            yield scope.context.di.create(JspExportTask, mapping)
                .pipe(scope.context.di.create(BeautifyHtmlTask, mapping))
                .pipe(scope.context.di.create(DecorateTask, mapping))
                .pipe(scope.context.di.create(WriteFilesTask, mapping))
                .run(buildConfiguration, options);
        }).catch(ErrorHandler.handler(scope));
        return promise;
    }


    /**
     * @inheritDocs
     */
    dispatch(action, parameters)
    {
        switch((action || '').toLowerCase())
        {
            default:
                return this.fluid(parameters);
        }
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspExportCommand = JspExportCommand;
