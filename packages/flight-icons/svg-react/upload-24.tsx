import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUpload24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.25 14a.75.75 0 0 1 .75.75v4.5A2.75 2.75 0 0 1 19.25 22H4.75A2.75 2.75 0 0 1 2 19.25v-4.5a.75.75 0 0 1 1.5 0v4.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25v-4.5a.75.75 0 0 1 .75-.75M12 2a.75.75 0 0 1 .543.232l5.25 5.5a.75.75 0 0 1-1.086 1.036L12.75 4.622V15.25a.75.75 0 0 1-1.5 0V4.622L7.293 8.768a.75.75 0 0 1-1.086-1.036l5.25-5.499A.75.75 0 0 1 12 2"
                />
            </svg>
        );
    }
);
