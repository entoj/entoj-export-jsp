'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const co = require('co');


/**
 * Renders the |empty and |notempty filters
 */
class JspEmptyFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspEmptyFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['empty', 'notempty'];
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
            if (node.name === 'empty')
            {
                result+= 'empty ';
            }
            else
            {
                result+= 'not empty ';
            }
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspEmptyFilterRenderer = JspEmptyFilterRenderer;
