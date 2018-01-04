'use strict';

/**
 * Registers with default configurations
 */
function register(configuration, options)
{
    // Commands
    configuration.commands.add(require('./command/JspExportCommand.js').JspExportCommand);

    // Renderer
    configuration.mappings.add(require('./export/index.js').JspRenderer,
        {
            '!nodeRenderers': require('./export/index.js').renderer.rendererList
        }
    );

    // Transformer
    configuration.mappings.add(require('./export/index.js').JspTransformer,
        {
            '!nodeTransformers': require('./export/index.js').transformer.transformerList
        }
    );
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
