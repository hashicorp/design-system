import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconLayers16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M7.656.084a.75.75 0 01.689 0l7.25 3.75a.75.75 0 010 1.332l-7.25 3.75a.75.75 0 01-.69 0l-7.25-3.75a.75.75 0 010-1.332l7.25-3.75zM2.383 4.5L8 7.405 13.617 4.5 8 1.594 2.383 4.5z"
                        clipRule="evenodd"
                    />
                    <path d="M.093 10.887a.75.75 0 011.02-.294L8 14.393l6.887-3.8a.75.75 0 11.725 1.313l-7.25 4a.75.75 0 01-.724 0l-7.25-4a.75.75 0 01-.295-1.019z" />
                    <path d="M1.112 7.093a.75.75 0 10-.724 1.313l7.25 4a.75.75 0 00.724 0l7.25-4a.75.75 0 10-.725-1.313L8 10.893l-6.888-3.8z" />
                </g>
            </svg>
        );
    }
);
