import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowUpLeft16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M3.057 3.463A.748.748 0 013.75 3h5.5a.75.75 0 010 1.5H5.56l7.22 7.22a.75.75 0 11-1.06 1.06L4.5 5.56v3.69a.75.75 0 01-1.5 0v-5.5c0-.102.02-.199.057-.287z"
                />
            </svg>
        );
    }
);
