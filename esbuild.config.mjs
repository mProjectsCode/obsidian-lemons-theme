/*
	On recommendation from @valentine195.
	Config based on @jdanielmourao's Sanctum theme esbuild setup.
	(https://github.com/jdanielmourao/obsidian-sanctum)
	Further based on https://github.com/damiankorcz/Prism-Theme/blob/main/esbuild.config.mjs
*/

import esbuild from "esbuild";
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import time from 'esbuild-plugin-time';

config();

const prod = process.argv[2] === "production";
const devF = process.argv[2] === "f";
const dir = prod ? "./" : (devF ? "./" : "theme_test_vault/.obsidian/themes");

/** Paths for final file */
const fileProd = `${dir}/theme.css`;
const fileDev = `${dir}/LemonsDev.css`;
const fileDevF = `${dir}/LemonsDev.css`;

esbuild.build({
	/** Entry point should be where everything is imported into. */
	entryPoints: ["src/scss/index.scss"],

	/** npm run dev will watch for file changes and rebuild instantly. */
	watch: !prod,
	logLevel: "info",
	outfile: prod ? fileProd : (devF ? fileDevF : fileDev),
	// minify: true,
	plugins: [
		sassPlugin({
			cache: true,
			charset: false,
			alertColor: true,
			alertAscii: true,
		}),
		time()
	]
}).catch(() => process.exit(1));
