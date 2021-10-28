import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCornerRightUp24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M10.043 9.768a.75.75 0 11-1.086-1.036l5.25-5.5a.75.75 0 011.085 0l5.25 5.5a.75.75 0 11-1.085 1.036L15.5 5.622V16.5c0 1.312-.49 2.578-1.375 3.52a4.634 4.634 0 01-3.375 1.48h-7a.75.75 0 010-1.5h7c.847 0 1.669-.357 2.282-1.009A3.639 3.639 0 0014 16.5V5.622l-3.957 4.146z"
                />
            </svg>
        );
    }
);
