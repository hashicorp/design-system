import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZap24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.453 1.269a.75.75 0 0 1 .88-.204c.306.136.484.46.437.792l-.918 6.408 8.48.94c.274.03.51.21.614.465a.75.75 0 0 1-.12.761l-10.278 12.3a.751.751 0 0 1-1.318-.587l.918-6.408-8.48-.94a.75.75 0 0 1-.614-.467.75.75 0 0 1 .12-.76zm-8.23 12.19 7.86.87a.754.754 0 0 1 .66.852l-.654 4.563 7.69-9.203-7.861-.87a.753.753 0 0 1-.66-.852l.654-4.563z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
