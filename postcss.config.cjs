module.exports = {
    plugins: [
        require('postcss-preset-env')({
            stage: 0,
            features: {
                'color-function': true,
                'custom-properties': {
                   'disableDeprecationNotice': true
                 }
            },
            importFrom: ['./src/styles/global/_variables.css'],
        }),
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'),
    ]
}