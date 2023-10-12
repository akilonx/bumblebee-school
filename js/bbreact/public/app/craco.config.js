const path = require("path");
module.exports = {
	webpack: {
		alias: {
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@config": path.resolve(__dirname, "src/config"),
			"@core": path.resolve(__dirname, "src/shared/core"),
			"@modules": path.resolve(__dirname, "src/modules"),
			"@infra": path.resolve(__dirname, "src/shared/infra"),
			"@layout": path.resolve(__dirname, "src/shared/layout"),
			"@component": path.resolve(__dirname, "src/shared/components"),
			"@utils": path.resolve(__dirname, "src/shared/utils"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@routes": path.resolve(__dirname, "src/routes"),
		},
	},
};
