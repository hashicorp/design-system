import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEnd16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M14.25 2a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V2.75a.75.75 0 01.75-.75zM6.205 3.235a.75.75 0 011.002-.08l.058.05 4.5 4.25a.75.75 0 01.053 1.034l-.053.056-4.5 4.25-.058.05a.75.75 0 01-1.025-1.085l.053-.055 3.13-2.955H1.75a.75.75 0 010-1.5h7.614L6.235 4.295l-.053-.055a.75.75 0 01.023-1.005z" />
                </g>
            </svg>
        );
    }
);
