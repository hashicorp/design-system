import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudDownload24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.001 12c.413.002.75.338.75.75v6.614l2.954-3.128a.75.75 0 0 1 1.06-.03c.3.284.314.759.031 1.06l-4.25 4.5-.014.015-.054.049a.76.76 0 0 1-.465.17h-.024a.76.76 0 0 1-.535-.235l-4.249-4.5a.75.75 0 0 1 .03-1.06.75.75 0 0 1 1.061.031l2.955 3.128v-6.613c0-.413.337-.75.75-.75M8.028 1.048a8.88 8.88 0 0 1 7.586 2.982 9 9 0 0 1 1.803 3.16h.726a5.85 5.85 0 0 1 3.698 1.327 5.92 5.92 0 0 1 2.036 3.373 5.95 5.95 0 0 1-.527 3.91 5.9 5.9 0 0 1-2.859 2.705.753.753 0 0 1-.989-.384.75.75 0 0 1 .384-.988 4.4 4.4 0 0 0 2.129-2.016c.46-.899.598-1.933.393-2.924a4.42 4.42 0 0 0-1.52-2.517 4.35 4.35 0 0 0-2.745-.987h-1.288a.754.754 0 0 1-.727-.564 7.5 7.5 0 0 0-1.64-3.104 7.45 7.45 0 0 0-2.858-2.007 7.4 7.4 0 0 0-3.45-.474c-1.17.12-2.297.52-3.284 1.165a7.5 7.5 0 0 0-2.4 2.549 7.56 7.56 0 0 0-.338 6.832 7.5 7.5 0 0 0 2.137 2.777c.321.26.373.733.114 1.055a.753.753 0 0 1-1.054.113 9 9 0 0 1-2.567-3.334 9.07 9.07 0 0 1 .406-8.187 9 9 0 0 1 2.881-3.06 8.9 8.9 0 0 1 3.953-1.402"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
