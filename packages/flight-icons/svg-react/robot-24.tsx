import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRobot24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 20.5a.75.75 0 010 1.5H6.75a.75.75 0 010-1.5h10.5zM15.875 2c.717 0 1.306.55 1.37 1.25h.255A2.75 2.75 0 0120.25 6v2.256a1.375 1.375 0 010 2.738V16a2.75 2.75 0 01-2.75 2.75h-11A2.75 2.75 0 013.75 16v-5.006a1.375 1.375 0 010-2.738V6A2.75 2.75 0 016.5 3.25h.256a1.375 1.375 0 012.738 0h5.012c.063-.7.652-1.25 1.369-1.25zM6.5 4.75c-.69 0-1.25.56-1.25 1.25v10c0 .69.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25h-11zm8.25 8.75a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5h5.5zM8.5 7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                />
            </svg>
        );
    }
);
