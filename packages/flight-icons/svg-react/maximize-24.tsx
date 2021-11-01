import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMaximize24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M15.75 2a.75.75 0 000 1.5h3.69l-5.22 5.22a.75.75 0 001.06 1.06l5.22-5.22v3.69a.75.75 0 001.5 0v-5.5l-.001-.039a.745.745 0 00-.462-.654A.748.748 0 0021.25 2h-5.5zM3.5 15.75a.75.75 0 00-1.5 0v5.5a.748.748 0 00.75.75h5.5a.75.75 0 000-1.5H4.56l5.22-5.22a.75.75 0 10-1.06-1.06L3.5 19.44v-3.69z" />
                </g>
            </svg>
        );
    }
);
