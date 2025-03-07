import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConfluenceColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill="url(#confluence-color-24__paint0_linear_7057_77)"
                    d="M2.71 17.177c-.207.338-.44.73-.621 1.042a.637.637 0 00.213.866l4.14 2.548a.638.638 0 00.883-.216c.162-.277.376-.637.608-1.023 1.64-2.707 3.293-2.376 6.265-.955l4.105 1.952a.638.638 0 00.857-.318l1.972-4.46a.637.637 0 00-.319-.834 628.29 628.29 0 01-4.14-1.968c-5.593-2.72-10.335-2.542-13.963 3.366z"
                />
                <path
                    fill="url(#confluence-color-24__paint1_linear_7057_77)"
                    d="M21.275 7.05c.207-.338.44-.733.637-1.042a.637.637 0 00-.216-.866l-4.141-2.548a.637.637 0 00-.879.216c-.166.277-.38.637-.612 1.022-1.64 2.708-3.29 2.376-6.264.956L5.68 2.845a.637.637 0 00-.853.319L2.856 7.623a.637.637 0 00.319.834c.866.408 2.592 1.22 4.14 1.968 5.59 2.698 10.332 2.52 13.96-3.376z"
                />
                <defs>
                    <linearGradient
                        id="confluence-color-24__paint0_linear_7057_77"
                        x1={21.815}
                        x2={5.871}
                        y1={24.151}
                        y2={19.376}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0050D3" />
                        <stop offset={0.94} stopColor="#007FFC" />
                        <stop offset={1} stopColor="#0082FF" />
                    </linearGradient>
                    <linearGradient
                        id="confluence-color-24__paint1_linear_7057_77"
                        x1={2.977}
                        x2={15.504}
                        y1={1.278}
                        y2={8.476}
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
