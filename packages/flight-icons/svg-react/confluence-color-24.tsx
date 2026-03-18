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
                    fill="url(#confluence-color-24__a)"
                    d="M2.71 17.178c-.207.337-.44.729-.621 1.041a.637.637 0 0 0 .213.866l4.14 2.548a.64.64 0 0 0 .883-.216c.162-.277.376-.637.608-1.023 1.64-2.707 3.294-2.376 6.265-.955l4.105 1.952a.64.64 0 0 0 .857-.318l1.972-4.46a.637.637 0 0 0-.319-.834 628 628 0 0 1-4.14-1.968c-5.593-2.72-10.335-2.542-13.963 3.366"
                />
                <path
                    fill="url(#confluence-color-24__b)"
                    d="M21.275 7.05c.207-.338.44-.733.637-1.042a.637.637 0 0 0-.216-.866l-4.141-2.548a.637.637 0 0 0-.879.216l-.612 1.023c-1.64 2.707-3.29 2.375-6.264.955L5.68 2.845a.637.637 0 0 0-.853.319L2.856 7.623a.637.637 0 0 0 .319.834c.866.408 2.592 1.22 4.14 1.968 5.59 2.698 10.332 2.52 13.96-3.376"
                />
                <defs>
                    <linearGradient
                        id="confluence-color-24__a"
                        x1={21.815}
                        x2={5.871}
                        y1={24.151}
                        y2={19.376}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0050d3" />
                        <stop offset={0.94} stopColor="#007ffc" />
                        <stop offset={1} stopColor="#0082ff" />
                    </linearGradient>
                    <linearGradient
                        id="confluence-color-24__b"
                        x1={2.977}
                        x2={15.504}
                        y1={1.278}
                        y2={8.476}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0050d3" />
                        <stop offset={0.94} stopColor="#007ffc" />
                        <stop offset={1} stopColor="#0082ff" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
