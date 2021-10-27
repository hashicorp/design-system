import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMove24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.463 1.057a.748.748 0 00-.243.163l-3 3a.75.75 0 001.06 1.06L11 3.56V11H3.56l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3a.748.748 0 000 1.06l3 3a.75.75 0 001.06-1.06L3.56 12.5H11v7.44l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.748.748 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12.5h7.44l-1.72 1.72a.75.75 0 101.06 1.06l3-3a.748.748 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06L19.94 11H12.5V3.56l1.72 1.72a.75.75 0 101.06-1.06l-3-3a.748.748 0 00-.817-.163z"
                />
            </svg>
        );
    }
);
