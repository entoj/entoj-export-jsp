'use strict';

/**
 * Registers with default configurations
 */
function register(configuration, options)
{
    // Commands
    configuration.commands.add(require('./command/JspExportCommand.js').JspExportCommand);

    // Export
    configuration.mappings.add(require('./index.js').export.JspRenderer,
        {
            '!nodeRenderers': require('./index.js').export.renderer.rendererList
        });
    configuration.mappings.add(require('./index.js').export.JspTransformer,
        {
            '!nodeTransformers': require('./index.js').export.transformer.transformerList
        });    
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
