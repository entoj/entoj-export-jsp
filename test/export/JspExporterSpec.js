'use strict';

/**
 * Requirements
 */
const JspExporter = require(JSP_SOURCE + '/export/JspExporter.js').JspExporter;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const JspRenderer = require(JSP_SOURCE + '/export/JspRenderer.js').JspRenderer;
const JspTransformer = require(JSP_SOURCE + '/export/JspTransformer.js').JspTransformer;
const DocumentationCallable = require('entoj-system').model.documentation.DocumentationCallable;
const exporterSpec = require('entoj-system/test').export.ExporterShared;
const projectFixture = require('entoj-system/test').fixture.project;
const co = require('co');
const fs = require('fs');
const UPDATE_SPECS = false;


/**
 * Spec
 */
describe(JspExporter.className, function()
{
    /**
     * Exporter Test
     */
    function prepareParameters(parameters, fullyConfigure)
    {
        const options =
        {
            settings:
            {
                jsp:
                {
                    configurationName: 'default'
                }
            }
        };
        if (fullyConfigure)
        {
            options.mappings =
            [
                {
                    type: require(JSP_SOURCE + '/export/JspRenderer.js').JspRenderer,
                    '!nodeRenderers': require(JSP_SOURCE + '/export/renderer/index.js').rendererList
                },
                {
                    type: require(JSP_SOURCE + '/export/JspTransformer.js').JspTransformer,
                    '!nodeTransformers': require(JSP_SOURCE + '/export/transformer/index.js').transformerList
                }
            ];
        }

        const fixture = projectFixture.createDynamic(options);
        const moduleConfiguration = fixture.context.di.create(JspModuleConfiguration);
        const jspRenderer = fixture.context.di.create(JspRenderer);
        const jspTransformer = fixture.context.di.create(JspTransformer);
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration, jspRenderer, jspTransformer);
            return parameters;
        }
        else
        {
            return [fixture.globalRepository, fixture.buildConfiguration, moduleConfiguration, jspRenderer, jspTransformer];
        }
    }
    exporterSpec(JspExporter, 'export/JspExporter', prepareParameters);


    /**
     * JspExporter Test
     */
    function expectFixture(fixture, entityQuery, macroQuery, settings)
    {
        const promise = co(function*()
        {
            const testee = new JspExporter(...prepareParameters(undefined, true));
            const result = yield testee.export('base', entityQuery, macroQuery, settings);
            if (UPDATE_SPECS)
            {
                fs.writeFileSync(JSP_FIXTURES + '/exporter/' + fixture + '.expected.jsp', result.contents, { encoding: 'utf8' });
            }
            expect(result.contents).to.be.equal(fs.readFileSync(JSP_FIXTURES + '/exporter/' + fixture + '.expected.jsp', { encoding: 'utf8' }));
            return result;
        });
        return promise;
    }

    describe('#export', function()
    {
        it('should export the default macro of given entity', function()
        {
            const promise = co(function*()
            {
                const result = yield expectFixture('default-macro', 'e-image', undefined, undefined);
                expect(result.configuration.macro).to.be.instanceof(DocumentationCallable);
                expect(result.configuration.macro.name).to.be.equal('e_image');
            });
            return promise;
        });

        it('should export the configured macro of given entity', function()
        {
            const promise = co(function*()
            {
                const result = yield expectFixture('selected-macro', 'm-teaser', 'm_teaser_hero', undefined);
                expect(result.configuration.macro).to.be.instanceof(DocumentationCallable);
                expect(result.configuration.macro.name).to.be.equal('m_teaser_hero');
            });
            return promise;
        });

        it('should allow to preconfigure macro parameters', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                    parameters:
                    {
                        classes: 'configured'
                    }
                };
                yield expectFixture('macro-parameters', 'e-image', undefined, settings);
            });
            return promise;
        });

        it('should allow to preconfigure call arguments', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                    settings:
                    {
                        e_cta:
                        {
                            arguments:
                            {
                                skin: 'dark'
                            }
                        }
                    }
                };
                yield expectFixture('call-arguments', 'm-teaser', undefined, settings);
            });
            return promise;
        });

        it('should inline macro calls that uses yield', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                };
                yield expectFixture('auto-inline', 'm-teaser', undefined, settings);
            });
            return promise;
        });

        it('should allow to export templates', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                };
                yield expectFixture('template', 't-bare', undefined, settings);
            });
            return promise;
        });
    });
});
