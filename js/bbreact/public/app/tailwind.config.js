/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const fontFamily = {
	sans: ["Open Sans", "sans-serif"],
	serif: ["Roboto Slab", "serif"],
	body: ["Open Sans", "sans-serif"],
};

module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily,
	},
	plugins: [],
});
