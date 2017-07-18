'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const co = require('co');


/**
 *
 */
class JspModuleClassesFilterRenderer extends JspFilterNodeRenderer
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
        const promise = co(function*()
        {
            let result = '';

            let moduleClass = '';
            if (node.arguments.length)
            {
                moduleClass = yield configuration.renderer.renderNode(node.arguments[0].value, configuration);
            }

            result+= '${ ' + moduleClass + ' }';
            const items = node.value.is('ArrayNode') ? node.value.children : [node.value];
            for (const item of items)
            {
                const value = yield configuration.renderer.renderNode(item, configuration);
                result+= ' ${ not empty ' + value + ' ? ' + moduleClass + '.concat(\'--\').concat(' + value + ') : \'\' }';
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
