import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConfluenceColor16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill="url(#confluence-color-16__paint0_linear_7057_81)"
                    d="M1.497 11.624c-.145.237-.308.51-.435.73a.446.446 0 00.15.606l2.898 1.783a.446.446 0 00.617-.151c.114-.194.263-.446.426-.716 1.148-1.895 2.306-1.663 4.386-.669l2.873 1.367a.446.446 0 00.6-.223l1.38-3.121a.446.446 0 00-.223-.585c-.606-.285-1.812-.856-2.898-1.377-3.915-1.904-7.235-1.78-9.774 2.356z"
                />
                <path
                    fill="url(#confluence-color-16__paint1_linear_7057_81)"
                    d="M14.492 4.535c.145-.237.308-.513.446-.73a.446.446 0 00-.151-.606l-2.899-1.784a.446.446 0 00-.615.152c-.116.194-.265.446-.428.716-1.148 1.895-2.303 1.663-4.385.669l-2.883-1.36a.446.446 0 00-.597.223L1.6 4.935a.446.446 0 00.222.585c.607.285 1.815.854 2.899 1.378 3.912 1.888 7.232 1.763 9.771-2.363z"
                />
                <defs>
                    <linearGradient
                        id="confluence-color-16__paint0_linear_7057_81"
                        x1={14.87}
                        x2={3.71}
                        y1={16.506}
                        y2={13.163}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0050D3" />
                        <stop offset={0.94} stopColor="#007FFC" />
                        <stop offset={1} stopColor="#0082FF" />
                    </linearGradient>
                    <linearGradient
                        id="confluence-color-16__paint1_linear_7057_81"
                        x1={1.684}
                        x2={10.453}
                        y1={0.495}
                        y2={5.533}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0050D3" />
                        <stop offset={0.94} stopColor="#007FFC" />
                        <stop offset={1} stopColor="#0082FF" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
