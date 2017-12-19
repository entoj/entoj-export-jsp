'use strict';

/**
 * Registers with default configurations
 */
function register(configuration, options)
{
    // Commands
    configuration.commands.add(require('./command/JspExportCommand.js').JspExportCommand);
}


/**
 * Exports
 * @ignore
 */
module.exports =
{
    register: register,
    command: require('./command/index.js'),
    configuration: require('./configuration/index.js'),
    export: require('./export/index.js'),
    task: require('./task/index.js')
};
