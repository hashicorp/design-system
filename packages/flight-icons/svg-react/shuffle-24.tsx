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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M14.47 14.47a.75.75 0 0 1 1.06 0l4.97 4.97v-3.69a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h3.69l-4.97-4.97a.75.75 0 0 1 0-1.06M21.25 2a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V4.56L3.28 21.78a.751.751 0 0 1-1.06-1.06L19.44 3.5h-3.69a.75.75 0 0 1 0-1.5zm-19.03.22a.75.75 0 0 1 1.06 0l6.25 6.25a.751.751 0 0 1-1.06 1.06L2.22 3.28a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
