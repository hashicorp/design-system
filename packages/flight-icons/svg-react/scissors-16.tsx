import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconScissors16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4 1a3 3 0 0 1 2.585 4.524L8 6.94l4.803-4.803a.75.75 0 0 1 1.06 1.061l-7.278 7.279a3 3 0 1 1-1.062-1.06L6.94 7.999 5.523 6.585A3 3 0 1 1 4 1m5.116 8.123a.75.75 0 0 1 1.06 0l3.687 3.68a.75.75 0 0 1-1.06 1.061l-3.686-3.68a.75.75 0 0 1 0-1.061M4 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m0-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
