import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSwitcher16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.25 12a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75H.75a.75.75 0 01-.75-.75v-2.5A.75.75 0 01.75 12h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 01.75-.75h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 01.75-.75h2.5zm-12-6a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75H.75A.75.75 0 010 9.25v-2.5A.75.75 0 01.75 6h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5A.75.75 0 016 9.25v-2.5A.75.75 0 016.75 6h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 01.75-.75h2.5zm-12-6A.75.75 0 014 .75v2.5a.75.75 0 01-.75.75H.75A.75.75 0 010 3.25V.75A.75.75 0 01.75 0h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5A.75.75 0 016 3.25V.75A.75.75 0 016.75 0h2.5zm6 0a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75V.75a.75.75 0 01.75-.75h2.5z"
                />
            </svg>
        );
    }
);
