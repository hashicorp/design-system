import StyleDictionaryPackage from 'style-dictionary';

// CUSTOM TRANSFORMS

StyleDictionaryPackage.registerTransform({
    name: 'spacing/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'rem' \n`;
        // TODO! CRIS: try to understand if we can use 'basePxFontSize' here
        return `${(token.value / 16)}rem`;
    }
});

StyleDictionaryPackage.registerTransformGroup({
    // copy of the SD "web" transform customized to support pxToRem
    // see: https://github.com/amzn/style-dictionary/blob/1fe585f196211200b3de671a941aae9b87e1163b/lib/common/transformGroups.js#L30-L34
    name: 'custom/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'spacing/pxToRem', 'color/css']
});
  

// DYNAMIC CONFIG

function getStyleDictionaryConfig() {
    return {
        "source": [
            `src/**/*.json`
        ],
        "platforms": {
            "web/css-variables": {
                "transformGroup": "custom/web",
                "buildPath": `dist/css/`,
                "prefix": "token",
                // TODO! Cristiano: to check if is useful (and how)
                // "basePxFontSize": 16,
                "files": [
                    {
                        "destination": "tokens.css",
                        "format": "css/variables"
                    }
                ]
            }
        }
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS

console.log('\n==============================================');

const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig());

console.log(`\nProcessing...`);
StyleDictionary.buildPlatform('web/css-variables');
console.log('\nEnd processing');

console.log('\n==============================================');
console.log('\nBuild completed!');
