
/** @type {require("prettier").Config} */
module.exports = {
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
