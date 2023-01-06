const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-88504b22.js","imports":["_app/immutable/start-88504b22.js","_app/immutable/chunks/index-4ec85775.js","_app/immutable/chunks/singletons-0c75040f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-00ef49fe.js'),
			() => import('./chunks/1-9cbb42f5.js'),
			() => import('./chunks/2-bf29638a.js'),
			() => import('./chunks/3-debb1dc9.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/detail",
				pattern: /^\/detail\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
