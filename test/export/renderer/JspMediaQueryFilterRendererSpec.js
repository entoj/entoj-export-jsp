'use strict';

/**
 * Requirements
 */
const JspMediaQueryFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspMediaQueryFilterRenderer.js').JspMediaQueryFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;
const co = require('co');


/**
 * Spec
 */
describe(JspMediaQueryFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [global.fixtures.globalConfiguration];
    };
    nodeRendererSpec(JspMediaQueryFilterRenderer, 'export.renderer/JspMediaQueryFilterRenderer', prepareParameters, require('./RendererHelper.js').options());

    /**
     * JspMediaQueryFilterRenderer Test
     */
    describe('#createAdditionalFiles', function()
    {
        it('should create a map of all configured media queries', function()
        {
            const promise = co(function*()
            {
                const testee = new JspMediaQueryFilterRenderer(global.fixtures.globalConfiguration);
                const files = yield testee.createAdditionalFiles();
                expect(files).to.have.length(1);
                expect(files[0].contents.toString()).to.contain('tabletAndAbove');
                expect(files[0].contents.toString()).to.contain('tablet');
                expect(files[0].contents.toString()).to.contain('tabletAndBelow');
            });
            return promise;
        });
    });
});
