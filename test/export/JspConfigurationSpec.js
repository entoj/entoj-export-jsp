'use strict';

/**
 * Requirements
 */
const JspConfiguration = require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const configurationSpec = require('entoj-system/test').export.ConfigurationShared;
const co = require('co');


/**
 * Spec
 */
describe(JspConfiguration.className, function()
{
    /**
     * Configuration Test
     */
    function prepareParameters(parameters)
    {
        const moduleConfiguration = new JspModuleConfiguration(global.fixtures.globalConfiguration, global.fixtures.buildConfiguration);
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration);
            return parameters;
        }
        else
        {
            return [undefined, undefined, {}, undefined, undefined, undefined, global.fixtures.globalRepository, global.fixtures.buildConfiguration, moduleConfiguration];
        }
    }
    configurationSpec(JspConfiguration, 'export/JspConfiguration', prepareParameters, { identifier: 'jsp' });


    /**
     * JspConfiguration Test
     */
    function createTestee(entity, macro, settings)
    {
        let params = [entity, macro, settings, undefined, undefined, undefined, global.fixtures.globalRepository, global.fixtures.buildConfiguration];
        if (prepareParameters)
        {
            params = prepareParameters(params);
        }
        return new JspConfiguration(...params);
    }

    describe('#getMacroConfiguration()', function()
    {
        it('should generate a filename', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings = {};
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.filename).to.be.equal('includes/elements/e-headline.jsp');
            });
            return promise;
        });

        it('should generate a include path', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings = {};
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.includePath).to.be.equal('/includes/elements/e-headline.jsp');
            });
            return promise;
        });

        it('should allow to configure the template for the base path of the include path', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings = {};
                global.fixtures.buildConfiguration.set('jsp.includePathTemplate', '/META-INF/path/to');
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.includePath).to.be.equal('/META-INF/path/to/includes/elements/e-headline.jsp');
            });
            return promise;
        });

        it('should auto complete provided incomplete filename', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings =
                {
                    filename: 'Headline'
                };
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.filename).to.be.equal('includes/elements/Headline.jsp');
            });
            return promise;
        });

        it('should allow provided absolute filenames', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings =
                {
                    filename: '/path/to/Headline'
                };
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.filename).to.be.equal('/path/to/Headline.jsp');
            });
            return promise;
        });

        it('should generate include path from provided filename', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings =
                {
                    filename: 'Headline'
                };
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.includePath).to.be.equal('/includes/elements/Headline.jsp');
            });
            return promise;
        });

        it('should allow to configure the template for the filename path', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings = {};
                global.fixtures.buildConfiguration.set('jsp.entityPathTemplate', '/${site.name.urlify()}/${entityCategory.pluralName.urlify()}');
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.filename).to.be.equal('base/elements/e-headline.jsp');
            });
            return promise;
        });

        it('should allow to configure the template for the filename', function()
        {
            const promise = co(function *()
            {
                configurationSpec.createEntity('base/elements/e-headline');
                const settings = {};
                global.fixtures.buildConfiguration.set('jsp.entityMacroFilenameTemplate', 'macro-${macro.name.urlify().dasherize()}');
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.filename).to.be.equal('includes/elements/macro-e-headline.jsp');
            });
            return promise;
        });
    });
});
