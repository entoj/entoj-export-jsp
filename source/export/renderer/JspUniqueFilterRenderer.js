'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const co = require('co');


/**
 * Renders the |unique filter
 */
class JspUniqueFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspUniqueFilterRenderer';
    }


    /**
     * @inheritDoc
     */
    get filterName()
    {
        return ['unique'];
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
                throw new Error('Could not locate unique filter in ' + node.type);
            }

            let result = '';

            // Prepare uniqueId
            result+= '<c:if test="${ empty entojUniqueIdFilter }"><c:set var="entojUniqueIdFilter" value="0" scope="request" /></c:if>';
            result+= '<c:set var="entojUniqueIdFilter" value="${ entojUniqueIdFilter +  1 }" scope="request" />';

            // Set
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '" value="';
            }
            // Id
            if (filter.value)
            {
                result+= '${ ';
                result+= yield configuration.renderer.renderNode(filter.value, configuration);
                result+= ' }-';
            }
            // Set
            result+= '${ entojUniqueIdFilter }';
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
module.exports.JspUniqueFilterRenderer = JspUniqueFilterRenderer;
