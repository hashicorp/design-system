import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArchive16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.75 8a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
                    <path
                        fillRule="evenodd"
                        d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v1.5c0 .698-.409 1.3-1 1.582v6.918A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75V5.832A1.75 1.75 0 010 4.25v-1.5zm13.5 10V6h-11v6.75c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75zm1-8.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-1.5a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v1.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
