import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconQueue16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 12a.75.75 0 010 1.5h-8a.75.75 0 010-1.5h8zm0-3.5a.75.75 0 010 1.5h-8a.75.75 0 010-1.5h8zM1.174 2.77a.75.75 0 011.056-.096l3 2.5a.75.75 0 010 1.152l-3 2.5a.75.75 0 01-.96-1.152L3.578 5.75 1.27 3.826a.75.75 0 01-.096-1.056zM14.25 5a.75.75 0 010 1.5h-6a.75.75 0 010-1.5h6z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
