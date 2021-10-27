import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCompass24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M16.951 7.997a.75.75 0 00-.948-.948l-6.36 2.12a.75.75 0 00-.474.474l-2.12 6.36a.75.75 0 00.948.948l6.36-2.12a.75.75 0 00.475-.474l2.12-6.36zm-8.005 7.057l1.527-4.581 4.581-1.527-1.527 4.581-4.581 1.527z" />
                    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" />
                </g>
            </svg>
        );
    }
);
