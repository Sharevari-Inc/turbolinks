import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"
import { version } from "./package.json"
const year = new Date().getFullYear()
const isProduction = process.env.BUILD === 'production'

const options = {
  plugins: [
    typescript({
      cacheRoot: "node_modules/.cache",
      tsconfigDefaults: {
        compilerOptions: {
          removeComments: true
        }
      }
    }),
    terser({
      output: {
        preamble: `/*\nTurbolinks ${version}\nCopyright © ${year} Basecamp, LLC\n */`
      }
    })
  ],
  watch: {
    include: "src/**"
  }
}

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/turbolinks.js",
      format: "umd",
      name: "Turbolinks",
      sourcemap: !isProduction
    },
    ...options
  },

  {
    input: "src/tests/index.ts",
    output: {
      file: "dist/tests.js",
      format: "cjs",
      sourcemap: true
    },
    external: [
      "intern"
    ],
    ...options
  }
]
