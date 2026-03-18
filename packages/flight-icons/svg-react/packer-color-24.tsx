import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackerColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#02a8ef">
                    <path
                        fillRule="evenodd"
                        d="m5 3.311 7.42 4.308V23.5L5 19.192z"
                        clipRule="evenodd"
                    />
                    <path d="M16.095 5.168 8.028.5v3.238l5.488 3.184v9.723l2.58 1.49c1.598.925 2.904.38 2.904-1.233V9.768c-.002-1.604-1.312-3.672-2.905-4.6" />
                </g>
            </svg>
        );
    }
);
