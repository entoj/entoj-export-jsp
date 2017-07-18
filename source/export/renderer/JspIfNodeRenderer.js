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
class JspIfNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspIfNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('IfNode'));
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

            // ... ? ... : ....
            if (node.parent && node.parent.is('ExpressionNode'))
            {
                result+= '(';
                result+= yield configuration.renderer.renderNode(node.condition, configuration);
                result+= ') ';
                result+= '? (';
                result+= yield configuration.renderer.renderList(node.children, configuration);
                result+= ') ';
                result+= ': (';
                result+= yield configuration.renderer.renderList(node.elseChildren, configuration);
                result+= ')';
            }
            // If ...
            else if (!node.elseChildren.length)
            {
                result+= '<c:if test="${ ';
                result+= yield configuration.renderer.renderNode(node.condition, configuration);
                result+= ' }">';
                result+= yield configuration.renderer.renderList(node.children, configuration);
                result+= '</c:if>';
            }
            // If ... else ...
            else
            {
                result+= '<c:choose><c:when test="${ ';
                result+= yield configuration.renderer.renderNode(node.condition, configuration);
                result+= ' }">';
                result+= yield configuration.renderer.renderList(node.children, configuration);
                result+= '</c:when>';
                result+= '<c:otherwise>';
                result+= yield configuration.renderer.renderList(node.elseChildren, configuration);
                result+= '</c:otherwise></c:choose>';
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
module.exports.JspIfNodeRenderer = JspIfNodeRenderer;
