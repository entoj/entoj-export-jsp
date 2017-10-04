'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const trimQuotes = require('entoj-system').utils.string.trimQuotes;
const co = require('co');


/**
 * Renders the |attributes filter
 */
class JspAttributesFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspAttributesFilterRenderer';
    }


    /**
     * @inheritDoc
     */
    get filterName()
    {
        return ['attributes', 'customAttributes'];
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
            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate attributes filter in ' + node.type);
            }

            // Get variable names
            const sourceName = filter.value
                ? yield configuration.renderer.renderNode(filter.value, configuration)
                : '';
            const variableName = node.variable
                ? yield configuration.renderer.renderNode(node.variable, configuration)
                : '';
            const prefixName = filter.arguments && filter.arguments.length
                ? trimQuotes(yield configuration.renderer.renderNode(filter.arguments[0].value, configuration)) + '-'
                : '';

            let result = '';

            // Initialize variable
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="' + variableName + '" value=""/>';
            }

            // Loop source
            result+= '<c:forEach var="' + variableName + '_iterator" items="${ ' + sourceName + ' }">';
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="' + variableName + '" value="';
            }
            result+= '${ ' + variableName + ' }' + prefixName + '${ ' + variableName + '_iterator.key }=&quot;${ ' + variableName + '_iterator.value }&quot; ';
            if (scope.isSet(node, configuration))
            {
                result+= '"/>';
            }
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
module.exports.JspAttributesFilterRenderer = JspAttributesFilterRenderer;
