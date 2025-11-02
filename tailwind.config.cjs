module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#A7E9AF", // verde claro
					DEFAULT: "#3EB489", // verde medio
					dark: "#2F9E73", // verde más oscuro
				},
				accent: {
					light: "#FFD6A5", // naranja pastel
					DEFAULT: "#FFB347", // naranja medio
					dark: "#FF9B00", // naranja más fuerte
				},
				neutral: {
					light: "#FFFFFF", // blanco
					dark: "#F5F5F5", // gris muy claro
				},
			},
		},
	},
	plugins: [],
};
