import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStarFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 .5c.282.001.543.16.67.412l2.063 4.094 4.623.662a.76.76 0 0 1 .608.514.76.76 0 0 1-.197.771l-3.335 3.18.787 4.487a.76.76 0 0 1-.294.735.76.76 0 0 1-.788.062L8 13.287l-4.137 2.13a.751.751 0 0 1-1.082-.797l.786-4.487-3.335-3.18a.75.75 0 0 1 .411-1.285l4.623-.662L7.33.912A.75.75 0 0 1 8 .5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
