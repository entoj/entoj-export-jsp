'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const Node = require('entoj-system').export.ast.Node;
const co = require('co');


/**
 * Renders |linkUrl filters
 */
class JspLinkUrlFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspLinkUrlFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['linkUrl', 'link'];
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
                throw new Error('Could not locate linkUrl filter in ' + node.type);
            }

            result+= '<c:url ';
            if (scope.isSet(node, configuration))
            {
                result+= 'var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '" ';
            }
            result+= 'url="${ ';
            result+= yield configuration.renderer.renderNode(filter.value, configuration);
            result+= ' }"';

            if (filter.arguments.length &&
                filter.arguments[0].find('ComplexVariableNode'))
            {
                result+= '>';
                const params = filter.arguments[0].find('ComplexVariableNode').value;
                for (const key in params)
                {
                    result+= '<c:param name="' + key + '" ';
                    result+= 'value="${ ';
                    if (params[key] instanceof Node)
                    {
                        result+= yield configuration.renderer.renderNode(params[key], configuration);
                    }
                    else
                    {
                        result+= params[key];
                    }
                    result+= ' }" />';
                }
                result+= '</c:url>';
            }
            else
            {
                result+=' />';
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
module.exports.JspLinkUrlFilterRenderer = JspLinkUrlFilterRenderer;
