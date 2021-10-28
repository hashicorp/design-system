import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMailOpen16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M8.803.254a2.25 2.25 0 00-1.606 0L1.447 2.45A2.25 2.25 0 000 4.552v8.198A2.25 2.25 0 002.25 15h11.5A2.25 2.25 0 0016 12.75V4.552a2.25 2.25 0 00-1.447-2.102L8.803.254zm-1.07 1.401a.75.75 0 01.535 0l5.75 2.196a.75.75 0 01.302.213L8 8.578 1.68 4.064a.749.749 0 01.302-.213l5.75-2.196zM1.5 5.78v6.6L5.116 8.36 1.5 5.78zM2.509 13.5h10.982L9.656 9.239l-1.22.871a.75.75 0 01-.872 0l-1.22-.871L2.509 13.5zM14.5 12.379v-6.6l-3.616 2.583 3.616 4.017z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
