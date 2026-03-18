import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRepeat16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M14.25 7.5a.75.75 0 0 1 .75.75v.833a3.42 3.42 0 0 1-3.417 3.417H3.777l1.961 1.68a.75.75 0 0 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 0 1 .976 1.14L3.778 11h7.805A1.92 1.92 0 0 0 13.5 9.083V8.25a.75.75 0 0 1 .75-.75M10.18.762A.75.75 0 0 1 11.239.68l3.5 3a.75.75 0 0 1 0 1.138l-3.5 3a.75.75 0 0 1-.976-1.138L12.222 5H4.418A1.917 1.917 0 0 0 2.5 6.917v.833a.75.75 0 0 1-1.5 0v-.833A3.42 3.42 0 0 1 4.417 3.5h7.806l-1.961-1.68A.75.75 0 0 1 10.18.761"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
