/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Mukta', 'sans-serif'],
        display: ['Mukta', 'sans-serif'],
        heading: ['Mukta', 'sans-serif'],
        },
        fontSize:{
          '32':'32px',
        },
        leading:{
          '38':'38px',
          '48':'48px',
        },
        margin:{
          '5px':'5px',
        },
        gridTemplateColumns: {
          'custom-2': '0.4fr 1fr !important',
        },
    },
    colors: {
        ...colors,
        transparent: 'transparent',
        'black-custom': '#111315',
        'black2-custom': '#17181C',
        'black3-custom': '#1e2020',
        'black4-custom': '#0C0F11',
        'black5-custom': '#343A40',
        'black6-custom': '#343434',
        'black7-custom': '#0c0f11',
        'red-custom': '#A32035',
        'blue-custom': '#E1F5FE',
        'green-custom': '#E0F2F1',
        'green2-custom': '#C6F6D5',
        'green3-custom': '#E8F5E9',
        'grey-custom': '#8C8E94',
        'grey2-custom': '#e9ecef',
        'grey3-custom': '#495057',
        'grey4-custom': '#FAFAFA',
        'grey5-custom': '#a9a9a9',
        'white2': '#F5F5F5',
      },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
