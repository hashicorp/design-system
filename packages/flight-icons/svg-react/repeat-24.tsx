import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRepeat24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.25 12c.414 0 .75.336.75.75v2a4.754 4.754 0 0 1-4.75 4.75H4.887l3.128 2.955a.75.75 0 0 1-1.03 1.09l-4.5-4.25a.75.75 0 0 1-.235-.545c0-.206.086-.404.235-.545l4.5-4.25a.75.75 0 0 1 1.03 1.09L4.887 18H17.25a3.25 3.25 0 0 0 3.25-3.25v-2c0-.414.336-.75.75-.75M16.455.485a.75.75 0 0 1 1.06-.03l4.5 4.25c.15.141.235.34.235.545a.75.75 0 0 1-.235.545l-4.5 4.25a.75.75 0 0 1-1.03-1.09L19.613 6H6.75A3.25 3.25 0 0 0 3.5 9.25v2a.75.75 0 0 1-1.5 0v-2A4.754 4.754 0 0 1 6.75 4.5h12.863l-3.128-2.955a.75.75 0 0 1-.03-1.06"
                />
            </svg>
        );
    }
);
