import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAzureDevops24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21 6.37v10.945L16.5 21l-6.975-2.54v2.518L5.576 15.82l11.509.9V6.864L21 6.371zm-3.836.551L10.706 3v2.573L4.778 7.315 3 9.595v5.18L5.543 15.9v-6.64l11.62-2.338z"
                />
            </svg>
        );
    }
);
