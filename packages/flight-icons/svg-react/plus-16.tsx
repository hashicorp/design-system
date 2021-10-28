import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPlus16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M9 3.5a.75.75 0 00-1.5 0V7H4a.75.75 0 000 1.5h3.5V12A.75.75 0 009 12V8.5h3.5a.75.75 0 000-1.5H9V3.5z"
                />
            </svg>
        );
    }
);
