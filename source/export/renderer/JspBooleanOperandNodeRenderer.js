'use strict';

/**
 * Requirements
 * @ignore
 */
const JspOperandNodeRenderer = require('./JspOperandNodeRenderer.js').JspOperandNodeRenderer;


/**
 *
 */
class JspBooleanOperandNodeRenderer extends JspOperandNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspBooleanOperandNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('BooleanOperandNode'));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspBooleanOperandNodeRenderer = JspBooleanOperandNodeRenderer;
