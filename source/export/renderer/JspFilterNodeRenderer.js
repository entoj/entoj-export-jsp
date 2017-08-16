'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const co = require('co');


/**
 *
 */
class JspFilterNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspFilterNodeRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return false;
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('FilterNode', { name: this.filterName }));
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

            if (node.isChildOf('ExpressionNode'))
            {
                result+= yield configuration.renderer.renderNode(node.value, configuration);
                result+= '.' + node.name + '(';
                const args = [];
                if (node.arguments)
                {
                    for (const argument of node.arguments)
                    {
                        args.push(yield configuration.renderer.renderNode(argument.value, configuration));
                    }
                }
                result+= args.join(', ');
                result+= ')';
            }
            else
            {
                result+= configuration.moduleConfiguration.viewHelperNamespace + ':' + node.name + '(';
                const args = [];
                args.push(yield configuration.renderer.renderNode(node.value, configuration));
                if (node.arguments)
                {
                    for (const argument of node.arguments)
                    {
                        args.push(yield configuration.renderer.renderNode(argument.value, configuration));
                    }
                }
                result+= args.join(', ');
                result+= ')';
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
module.exports.JspFilterNodeRenderer = JspFilterNodeRenderer;
