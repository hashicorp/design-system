import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConnectionGateway16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75.5a2.25 2.25 0 11-.606 4.417L12.03 6.03a.755.755 0 01-.14.11c.071.19.11.396.11.61v2.5c0 .214-.039.42-.11.61.05.03.097.067.14.11l1.114 1.113a2.25 2.25 0 11-1.24.88l-.934-.933a.755.755 0 01-.11-.14c-.19.071-.396.11-.61.11h-2.5A1.75 1.75 0 016 9.25v-.5H4.372a2.251 2.251 0 110-1.5H6v-.5C6 5.784 6.784 5 7.75 5h2.5c.214 0 .42.039.61.11a.755.755 0 01.11-.14l.933-.934A2.25 2.25 0 0113.75.5zm0 12a.75.75 0 100 1.5.75.75 0 000-1.5zm-6-6a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zm-5.5.75a.75.75 0 100 1.5.75.75 0 000-1.5zM13.75 2a.75.75 0 100 1.5.75.75 0 000-1.5z"
                />
            </svg>
        );
    }
);
