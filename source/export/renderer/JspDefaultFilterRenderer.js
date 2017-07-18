'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const co = require('co');


/**
 * Renders the nunjucks |default filter
 */
class JspDefaultFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export.renderer/JspDefaultFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['default'];
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
            const value =  yield configuration.renderer.renderNode(node.value, configuration);
            let defaultValue = '\'\'';
            if (node.arguments && node.arguments.length)
            {
                defaultValue = yield configuration.renderer.renderNode(node.arguments[0].value, configuration);
            }
            result+= 'empty ' + value + ' ? ' + defaultValue + ' : ' + value;
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspDefaultFilterRenderer = JspDefaultFilterRenderer;
