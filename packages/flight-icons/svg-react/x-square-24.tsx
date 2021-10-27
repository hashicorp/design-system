import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXSquare24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    d="M4.806 3.5c-.721 0-1.306.585-1.306 1.306v14.388c0 .722.585 1.306 1.306 1.306h14.388c.722 0 1.306-.584 1.306-1.306V4.806c0-.721-.584-1.306-1.306-1.306H4.806zM2 4.806A2.806 2.806 0 014.806 2h14.388A2.806 2.806 0 0122 4.806v14.388A2.806 2.806 0 0119.194 22H4.806A2.806 2.806 0 012 19.194V4.806zM7.22 7.22a.75.75 0 011.06 0L12 10.94l3.72-3.72a.75.75 0 111.06 1.06L13.06 12l3.72 3.72a.75.75 0 11-1.06 1.06L12 13.06l-3.72 3.72a.75.75 0 01-1.06-1.06L10.94 12 7.22 8.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
