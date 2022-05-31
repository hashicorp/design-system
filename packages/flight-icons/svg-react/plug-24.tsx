import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlug24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.28 3.94a.75.75 0 00-1.06-1.061L12.418 5.68 10.4 3.662a2.333 2.333 0 00-3.3 0 8.667 8.667 0 00-.04 12.217l-3.73 3.73a.75.75 0 101.061 1.06l3.733-3.732a8.667 8.667 0 0012.057-.193 2.333 2.333 0 000-3.3l-1.736-1.737L21.37 8.78a.75.75 0 10-1.06-1.06l-2.927 2.926-3.905-3.905 2.801-2.802zm-8.12.783a.833.833 0 011.18 0l9.78 9.782a.833.833 0 010 1.178 7.167 7.167 0 01-10.134 0l-.825-.825a7.167 7.167 0 010-10.135z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
