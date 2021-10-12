import StyleDictionaryPackage from 'style-dictionary';

// DYNAMIC CONFIG

function getStyleDictionaryConfig() {
    return {
        "source": [
            `src/**/*.json`
        ],
        "platforms": {
            "web/css-variables": {
                "transformGroup": "web",
                "buildPath": `dist/css/`,
                "prefix": "token",
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
