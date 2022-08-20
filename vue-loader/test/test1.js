// Inject style-post-loader before css-loader for scoped css and trimming
if (query.type === 'style') {
    const cssLoaderIndex = loaders.findIndex(isCSSLoader);
    if (cssLoaderIndex > -1) {
        const afterLoaders = loaders.slice(0, cssLoaderIndex + 1);
        const beforeLoaders = loaders.slice(cssLoaderIndex + 1);

        const request = genRequest([
            ...afterLoaders,
            stylePostLoaderPath,
            ...beforeLoaders,
        ]);

        return `import mod from ${request}; export default mod; export * from ${request}`;
    }
}

const pitcher = {
    loader: require.resolve('pitcher'),
    resourceQuery: query => {
        if (!query) {
            return false;
        }
        const parsed = qs.parse(query.slice(1));
        return parsed.vue != null;
    }
}