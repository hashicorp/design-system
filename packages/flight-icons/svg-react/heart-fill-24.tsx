import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHeartFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    d="M16.854 3c-.805 0-1.602.155-2.346.457a6.154 6.154 0 00-1.993 1.304L12 5.265l-.515-.504a6.205 6.205 0 00-4.34-1.76 6.205 6.205 0 00-4.34 1.76A5.974 5.974 0 001 9.031c0 1.605.651 3.14 1.806 4.27l8.67 8.485a.75.75 0 001.048 0l8.67-8.485a6.022 6.022 0 001.336-1.957 5.93 5.93 0 000-4.626 6.024 6.024 0 00-1.336-1.957 6.154 6.154 0 00-1.993-1.304A6.246 6.246 0 0016.854 3z"
                />
            </svg>
        );
    }
);
