import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinimizeAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.25 15A2.75 2.75 0 0 1 9 17.75V21a.75.75 0 0 1-1.5 0v-3.25c0-.69-.56-1.25-1.25-1.25H3A.75.75 0 0 1 3 15zM21 15a.75.75 0 0 1 0 1.5h-3.25c-.69 0-1.25.56-1.25 1.25V21a.75.75 0 0 1-1.5 0v-3.25A2.75 2.75 0 0 1 17.75 15zM8.25 2.25A.75.75 0 0 1 9 3v3.25A2.75 2.75 0 0 1 6.25 9H3a.75.75 0 0 1 0-1.5h3.25c.69 0 1.25-.56 1.25-1.25V3a.75.75 0 0 1 .75-.75m7.5 0a.75.75 0 0 1 .75.75v3.25c0 .69.56 1.25 1.25 1.25H21A.75.75 0 0 1 21 9h-3.25A2.75 2.75 0 0 1 15 6.25V3a.75.75 0 0 1 .75-.75"
                />
            </svg>
        );
    }
);
