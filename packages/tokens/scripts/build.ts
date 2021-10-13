import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs-extra';
// import path from 'path';

// SCRIPT CONFIG
// TODO use path() here
const rootFolder = __dirname;
const distFolder = `${rootFolder}/../dist`;

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

// copy of SD "size/px" but using the "group" for matching
StyleDictionaryPackage.registerTransform({
    name: 'spacing/px',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px' \n`;
        return `${token.value}px`;
    }
});


StyleDictionaryPackage.registerTransformGroup({
    // copy of the SD "web" transform customized to support "spacing/pxToRem"
    // see: https://github.com/amzn/style-dictionary/blob/1fe585f196211200b3de671a941aae9b87e1163b/lib/common/transformGroups.js#L30-L34
    name: 'products/custom/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'spacing/pxToRem', 'color/css']
});

StyleDictionaryPackage.registerTransformGroup({
    // copy of the SD "web" transform customized to support "spacing/px"
    // see: https://github.com/amzn/style-dictionary/blob/1fe585f196211200b3de671a941aae9b87e1163b/lib/common/transformGroups.js#L30-L34
    name: 'marketing/custom/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/px', 'spacing/px', 'color/css']
});
  

// DYNAMIC CONFIG

const targets = {
    'products': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`
        ],
        'transformGroup': 'products/custom/web',
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/marketing/**/*.json`
        ],
        'transformGroup': 'marketing/custom/web',
    }
} as const;

// TODO! Cristiano: fix TS
// type Targets = Object.keys(sources);
type Targets  = 'products' | 'marketing';

function getStyleDictionaryConfig({ target }: { target: Targets }) {
    return {
        "source": targets[target].source,
        "platforms": {
            "web/css-variables": {
                "transformGroup": targets[target].transformGroup,
                "buildPath": `dist/${target}/css/`,
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

// empty the dist folder
fs.emptyDirSync(distFolder);

Object.keys(targets).forEach(target => {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig({ target }));
    
    console.log(`\nProcessing...`);
    StyleDictionary.buildPlatform('web/css-variables');
    console.log('\nEnd processing');
})


console.log('\n==============================================');
console.log('\nBuild completed!');
