import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCrop16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M4.5 1.25a.75.75 0 00-1.5 0V3H1.25a.75.75 0 000 1.5H3v6.456A2.044 2.044 0 005.044 13H11.5v1.75a.75.75 0 001.5 0V13h1.75a.75.75 0 000-1.5H13V5.044A2.044 2.044 0 0010.956 3H4.5V1.25zm0 3.25v6.456a.544.544 0 00.544.544H11.5V5.044a.544.544 0 00-.544-.544H4.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
