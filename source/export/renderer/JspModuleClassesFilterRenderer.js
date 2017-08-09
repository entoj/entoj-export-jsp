'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const co = require('co');


/**
 * Renders the |moduleClasses filter
 */
class JspModuleClassesFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspModuleClassesFilterRenderer';
    }


    /**
     * @inheritDoc
     */
    get filterName()
    {
        return 'moduleClasses';
    }


    /**
     * @return {Promise<String>}
     */
    render(node, configuration)
    {
        if (!node || !configuration)
        {
            return Promise.resolve('');
        }
        const scope = this;
        const promise = co(function*()
        {
            let result = '';

            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate moduleClasses filter in ' + node.type);
            }

            // Get moduleClass
            let moduleClass = '';
            if (filter.arguments.length)
            {
                moduleClass = yield configuration.renderer.renderNode(filter.arguments[0].value, configuration);
            }

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '" value="';
            }

            // Build -- variants
            result+= '${ ' + moduleClass + ' }';
            const items = filter.value.is('ArrayNode') ? filter.value.children : [filter.value];
            for (const item of items)
            {
                const value = yield configuration.renderer.renderNode(item, configuration);
                result+= ' ${ not empty ' + value + ' ? ' + moduleClass + '.concat(\'--\').concat(' + value + ') : \'\' }';
            }

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '" />';
            }

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspModuleClassesFilterRenderer = JspModuleClassesFilterRenderer;
