import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconThumbsDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.77 21.484l3.73-8.393V2.5H5.52a1.25 1.25 0 00-1.236 1.062l-1.443 9.5A1.25 1.25 0 004.077 14.5H9.25c.967 0 1.75.784 1.75 1.75v3.225c0 1.032.772 1.884 1.77 2.01zM18 2.5v10h2.25c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25H18zM17.738 14l-3.711 8.349a1.097 1.097 0 01-1.002.651A3.525 3.525 0 019.5 19.475V16.25a.25.25 0 00-.25-.25H4.077a2.75 2.75 0 01-2.72-3.163l1.444-9.5A2.75 2.75 0 015.519 1H20.25A2.75 2.75 0 0123 3.75v7.5A2.75 2.75 0 0120.25 14h-2.512z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
