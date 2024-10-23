
/** @type {require("prettier").Config} */
const config=  {
  printWidth: 100,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 4,
      },
    },
  ],
};

export default config