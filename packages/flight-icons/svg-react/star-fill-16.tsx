import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconStarFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.67.912a.75.75 0 00-1.34 0L5.266 5.006l-4.622.662a.75.75 0 00-.412 1.285l3.335 3.18-.786 4.488a.75.75 0 001.082.796L8 13.287l4.137 2.13a.75.75 0 001.082-.796l-.786-4.489 3.335-3.18a.75.75 0 00-.412-1.284l-4.622-.662L8.67.912z"
                />
            </svg>
        );
    }
);
