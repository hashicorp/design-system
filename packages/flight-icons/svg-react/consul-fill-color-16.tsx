import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConsulFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#E03875"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.004 12.375a4.374 4.374 0 112.96-7.594L9.924 5.868a2.875 2.875 0 100 4.267l1.038 1.086a4.364 4.364 0 01-2.96 1.154zm3.52-2.188a.359.359 0 110-.718.359.359 0 010 .718zM7.976 8.948a.948.948 0 11-.008-1.896.948.948 0 01.008 1.896zm3.96.017a.359.359 0 110-.718.359.359 0 010 .718zm-1.067-.045a.358.358 0 110-.717.358.358 0 010 .717zm1.066-1.164a.359.359 0 110-.717.359.359 0 010 .717zm-1.066.041a.359.359 0 110-.717.359.359 0 010 .717zm.676-1.247a.359.359 0 11-.002-.717.359.359 0 01.002.717z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
