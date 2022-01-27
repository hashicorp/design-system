import prettier from 'prettier';

const prettierConfig = { parser: 'css' as const, tabWidth: 4 };

export const getCssForIconAnimation = (): string => {
    const cssSource = `
        @keyframes hds-fligh-icon-animation-rotation {
            to {transform: rotate(360deg);}
        }

        @media (prefers-reduced-motion: no-preference) {

            .hds-flight-icon--animation-loading {
                animation: hds-fligh-icon-animation-rotation .7s linear infinite;
            }

            .hds-flight-icon--animation-running {
                animation: hds-fligh-icon-animation-rotation 1s linear infinite;
            }
        }
    `;

    return prettier.format(cssSource, prettierConfig);
};
