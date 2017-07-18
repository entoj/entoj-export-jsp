'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const uppercaseFirst = require('entoj-system').utils.string.uppercaseFirst;
const co = require('co');


/**
 *
 */
class JspForNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspForNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('ForNode'));
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

            // Create iteration var
            const variableName = node.keyName ? node.keyName + 'And' + uppercaseFirst(node.valueName) : node.valueName;

            // Create iteration
            result+= '<c:forEach var="';
            result+= variableName;
            result+= '" items="${ ';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            result+= ' }"';
            result+= ' varStatus="loop">';

            // Add local vars
            if (node.keyName)
            {
                result+= '<c:set';
                result+= ' var="' + node.keyName + '"';
                result+= ' value="${ ' + variableName + '.key }"';
                result+= ' />';
                result+= '<c:set';
                result+= ' var="' + node.valueName + '"';
                result+= ' value="${ ' + variableName + '.value }"';
                result+= ' />';
            }

            // Render children
            result+= yield configuration.renderer.renderList(node.children, configuration);

            // End Iteration
            result+= '</c:forEach>';

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspForNodeRenderer = JspForNodeRenderer;
