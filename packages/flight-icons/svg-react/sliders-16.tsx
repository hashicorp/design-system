import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSliders16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.5 9a.75.75 0 010 1.5h-1v3.75a.75.75 0 01-1.5 0V10.5H1A.75.75 0 011 9h3.5zm3.25-2a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 017.75 7zm6.75 3a.75.75 0 010 1.5h-1v2.75a.75.75 0 01-1.5 0V11.5h-1a.75.75 0 010-1.5h3.5zm-1.75-9a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75zm-10 0a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 012.75 1zm5 0a.75.75 0 01.75.75V4.5h1a.75.75 0 010 1.5H6a.75.75 0 010-1.5h1V1.75A.75.75 0 017.75 1z"
                />
            </svg>
        );
    }
);
