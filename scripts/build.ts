import StyleDictionaryPackage, { DesignToken, Transform }  from 'style-dictionary';
import fs from 'fs-extra';
import path from 'path';

import { ConfigTargets } from './@types/Config';

// SCRIPT CONFIG

const distFolder = path.resolve(__dirname, '../dist');

// CUSTOM TRANSFORMS

const transformPxToRem: Transform['transformer'] = (token, platform) => {
    const val = parseFloat(token.value);
    const baseFont = platform?.basePxFontSize || 16;
    if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'rem' \n`;
    return `${(token.value / baseFont)}rem`;
}

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

StyleDictionaryPackage.registerTransform({
    name: 'spacing/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: transformPxToRem
});

StyleDictionaryPackage.registerTransform({
    name: 'typography/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'typography' && token.type === 'size';
    },
    transformer: transformPxToRem
});

StyleDictionaryPackage.registerTransform({
    name: 'typography/weight',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'typography' && token.type === 'weight';
    },
    transformer: (token: DesignToken) => {
        const weight = token.value;
        switch (weight) {
            case 'bold':
                return '700';
            case 'semibold':
                return '600';
            case 'medium':
                return '500';
            case 'regular':
                return '400';
            default:
                return '400';
        }
    }
});


StyleDictionaryPackage.registerTransformGroup({
    name: 'products/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/pxToRem', 'typography/pxToRem', 'typography/weight', 'color/css']
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'marketing/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/px', 'color/css']
});


// DYNAMIC CONFIG

const targets: ConfigTargets = {
    'products': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`
        ],
        'transformGroup': 'products/web',
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/marketing/**/*.json`
        ],
        'transformGroup': 'marketing/web',
    }
};

function getStyleDictionaryConfig({ target }: { target: string }) {
    return {
        "source": targets[target].source,
        "platforms": {
            "web/css-variables": {
                "transformGroup": targets[target].transformGroup,
                "buildPath": `dist/${target}/css/`,
                "prefix": "token",
                "basePxFontSize": 16,
                "files": [
                    {
                        "destination": "tokens.css",
                        "format": "css/variables",
                        "filter": function(token: DesignToken) {
                            return !token.private;
                        },
                    }
                ]
            }
        }
    };
}

// PROCESS THE DESIGN TOKENS

console.log('Build started...');
console.log('\n==============================================');

// empty the dist folder
console.log(`\nCleaning up dist folder`);
fs.emptyDirSync(distFolder);

Object.keys(targets).forEach(target => {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig({ target }));

    console.log(`\nProcessing target "${target}"...`);
    StyleDictionary.buildPlatform('web/css-variables');
    console.log('\nEnd processing');
})


console.log('\n==============================================');
console.log('\nBuild completed!');
