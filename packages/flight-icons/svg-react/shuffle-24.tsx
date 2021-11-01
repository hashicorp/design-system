import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShuffle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M21.943 2.463A.748.748 0 0021.25 2h-5.5a.75.75 0 000 1.5h3.69L2.22 20.72a.75.75 0 101.06 1.06L20.5 4.56v3.69a.75.75 0 001.5 0v-5.5a.747.747 0 00-.057-.287zM20.5 19.44v-3.69a.75.75 0 011.5 0v5.5a.747.747 0 01-.75.75h-5.5a.75.75 0 010-1.5h3.69l-4.97-4.97a.75.75 0 111.06-1.06l4.97 4.97zM9.53 9.53a.75.75 0 000-1.06L3.28 2.22a.75.75 0 00-1.06 1.06l6.25 6.25a.75.75 0 001.06 0z" />
                </g>
            </svg>
        );
    }
);
