import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClipboardCopy24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M8.75 1A1.75 1.75 0 007 2.75V3H5.75A2.75 2.75 0 003 5.75v14.5A2.75 2.75 0 005.75 23h12.5A2.75 2.75 0 0021 20.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25V5.75c0-.69.56-1.25 1.25-1.25h1.268c.121.848.85 1.5 1.732 1.5h6.5a1.75 1.75 0 001.732-1.5h1.268c.69 0 1.25.56 1.25 1.25v4.5a.75.75 0 001.5 0v-4.5A2.75 2.75 0 0018.25 3H17v-.25A1.75 1.75 0 0015.25 1h-6.5zM8.5 2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v1.5a.25.25 0 01-.25.25h-6.5a.25.25 0 01-.25-.25v-1.5z"
                        clipRule="evenodd"
                    />
                    <path d="M7 9.75A.75.75 0 017.75 9h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017 9.75zM7 17.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM7.75 13a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM22.75 14a.75.75 0 01-.75.75h-6.34l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.747.747 0 01-.24-.533v-.034a.748.748 0 01.227-.521l.014-.013L16.74 10.2a.75.75 0 111.02 1.1l-2.1 1.95H22a.75.75 0 01.75.75z" />
                </g>
            </svg>
        );
    }
);
