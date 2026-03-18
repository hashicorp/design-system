import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOracle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.1 8c0 2.761 2.238 5 4.997 5h5.806A5 5 0 0 0 15.9 8c0-2.761-2.237-5-4.997-5H5.097A5 5 0 0 0 .1 8m13.911 0a3.235 3.235 0 0 1-3.234 3.237h-5.55A3.235 3.235 0 0 1 1.991 8a3.235 3.235 0 0 1 3.234-3.236h5.551A3.235 3.235 0 0 1 14.011 8"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
