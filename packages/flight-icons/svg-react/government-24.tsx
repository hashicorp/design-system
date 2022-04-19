import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGovernment24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M11.25 2.75c0-.966.784-1.75 1.75-1.75h2.25a.75.75 0 010 1.5H13a.25.25 0 00-.25.25V4.5l-.001.038a7.252 7.252 0 016.48 6.655.75.75 0 01-1.496.114 5.75 5.75 0 00-11.466 0 .75.75 0 11-1.496-.114 7.252 7.252 0 016.48-6.655.692.692 0 01-.001-.038V2.75z" />
                    <path
                        fillRule="evenodd"
                        d="M2 13.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5H19.5v7h2.75a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5H4.5v-7H2.75a.75.75 0 01-.75-.75zm4 7.75h3v-7H6v7zm7.5 0v-7h-3v7h3zm1.5 0h3v-7h-3v7z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
