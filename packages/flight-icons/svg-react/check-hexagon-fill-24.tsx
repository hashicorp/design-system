import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheckHexagonFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M13.441 1.006a2.75 2.75 0 0 0-2.882 0l-7.75 4.77A2.75 2.75 0 0 0 1.5 8.118v7.764a2.75 2.75 0 0 0 1.309 2.342l7.75 4.77a2.75 2.75 0 0 0 2.882 0l7.75-4.77a2.75 2.75 0 0 0 1.309-2.342V8.118a2.75 2.75 0 0 0-1.309-2.342zm2.84 8.774-5.5 5.5a.75.75 0 0 1-1.061 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.97 1.97 4.97-4.97a.75.75 0 0 1 1.06 1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
