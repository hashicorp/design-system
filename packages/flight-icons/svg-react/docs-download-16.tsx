import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDocsDownload16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11 6.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9M12.75 1c.69 0 1.25.56 1.25 1.25V4.5a.75.75 0 0 1-1.5 0v-2H4.25a.75.75 0 0 0-.75.75v6.878q.354-.126.75-.128h.25a.75.75 0 0 1 0 1.5h-.25a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75h1a.75.75 0 0 1 0 1.5h-1A2.25 2.25 0 0 1 2 12.75v-9.5A2.25 2.25 0 0 1 4.25 1zM11 7.45a3.55 3.55 0 1 0 0 7.1 3.55 3.55 0 0 0 0-7.1m0 .95a.6.6 0 0 1 .6.6v2.551l.726-.726a.6.6 0 0 1 .848.849l-1.75 1.75a.6.6 0 0 1-.848 0l-1.75-1.75a.6.6 0 0 1 .848-.85l.726.727V9a.6.6 0 0 1 .6-.6"
                />
            </svg>
        );
    }
);
