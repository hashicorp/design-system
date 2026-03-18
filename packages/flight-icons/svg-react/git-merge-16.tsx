import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitMerge16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.75 1a3 3 0 0 1 .894 5.864q.107.288.311.657a9 9 0 0 0 1.308 1.744c.904.952 1.935 1.662 2.855 1.9a3.001 3.001 0 1 1-.038 1.525c-1.46-.256-2.869-1.3-3.905-2.392a11 11 0 0 1-.675-.78V14A.75.75 0 0 1 3 14V6.905A3.001 3.001 0 0 1 3.75 1M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-8.25-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
