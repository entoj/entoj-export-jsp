'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const co = require('co');


/**
 * Renders the |htmlencode or |escape filter
 */
class JspEscapeFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspEscapeFilterRenderer';
    }


    /**
     * @inheritDoc
     */
    get filterName()
    {
        return ['htmlencode', 'escape'];
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
                throw new Error('Could not locate escape filter in ' + node.type);
            }

            // Get data
            const encode = yield configuration.renderer.renderNode(filter.value, configuration);

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '">';
            }

            result+= '<c:out value="${ ' + encode + ' }" />';

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '</c:set>';
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
module.exports.JspEscapeFilterRenderer = JspEscapeFilterRenderer;
