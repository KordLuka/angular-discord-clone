const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, './node_modules/flowbite/**/*.js'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c64f2',
        primaryd: '#fff',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // add this line
  ],
};
