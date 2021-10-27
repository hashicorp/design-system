import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCornerDownLeft16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    d="M13.5 2.75a.75.75 0 00-1.5 0v4.5A1.75 1.75 0 0110.25 9H4.56l2.22-2.22a.75.75 0 00-1.06-1.06l-3.5 3.5a.748.748 0 000 1.06l3.5 3.5a.75.75 0 001.06-1.06L4.56 10.5h5.69a3.25 3.25 0 003.25-3.25v-4.5z"
                />
            </svg>
        );
    }
);
