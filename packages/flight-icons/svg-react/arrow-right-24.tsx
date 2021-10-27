import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.229 5.04a.75.75 0 011.042-1.08l7.5 7.25a.75.75 0 010 1.08l-7.5 7.25a.75.75 0 11-1.042-1.08l6.166-5.96H3.75a.75.75 0 010-1.5h14.645l-6.166-5.96z"
                />
            </svg>
        );
    }
);
