import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWifi16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M8.007 12a1 1 0 010 2H8a1 1 0 010-2h.007zm-.004-3a4.75 4.75 0 012.751.878.75.75 0 01-.868 1.223 3.252 3.252 0 00-3.765 0 .75.75 0 01-.869-1.223A4.75 4.75 0 018.003 9zm.024-3.5c1.89 0 3.72.663 5.173 1.872a.75.75 0 11-.96 1.152 6.584 6.584 0 00-8.427 0 .75.75 0 11-.96-1.152A8.085 8.085 0 018.027 5.5zM8 2c2.78 0 5.464 1.015 7.55 2.853a.75.75 0 01-.993 1.125 9.917 9.917 0 00-13.114 0A.75.75 0 01.45 4.853 11.419 11.419 0 018 2z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
