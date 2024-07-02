/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import prettier from 'prettier';

const prettierConfig = { parser: 'css' as const, tabWidth: 4 };

export const getCssForIconAnimation = async(): Promise<string> => {
    let cssSource = '/**\n * Copyright (c) HashiCorp, Inc.\n * SPDX-License-Identifier: MPL-2.0\n */\n\n';
    cssSource += `
        @keyframes hds-flight-icon-animation-rotation {
            to {transform: rotate(360deg);}
        }

        .hds-flight-icon--animation-loading {
            animation: hds-flight-icon-animation-rotation 9s linear infinite;
        }

        .hds-flight-icon--animation-running {
            animation: hds-flight-icon-animation-rotation 9s linear infinite;
        }

        @media (prefers-reduced-motion: no-preference) {

            .hds-flight-icon--animation-loading {
                animation-duration: .7s;
            }

            .hds-flight-icon--animation-running {
                animation-duration: 1s;
            }
        }
    `;
    const formattedCss = await prettier.format(cssSource, prettierConfig);

    return formattedCss;
};
