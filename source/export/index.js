/**
 * @namespace export
 */
module.exports =
{
    FluidConfiguration: require('./FluidConfiguration.js').FluidConfiguration,
    FluidExporter: require('./FluidExporter.js').FluidExporter,
    FluidRenderer: require('./FluidRenderer.js').FluidRenderer,
    FluidTransformer: require('./FluidTransformer.js').FluidTransformer,
    renderer: require('./renderer/index.js')
};
