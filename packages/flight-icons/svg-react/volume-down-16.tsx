import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconVolumeDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                        d="M9 3.71a1.25 1.25 0 00-1.967-1.024L3.728 5H1.25C.56 5 0 5.56 0 6.25v3.5C0 10.44.56 11 1.25 11h2.478l3.305 2.314A1.25 1.25 0 009 12.29V3.71zM4.524 6.274L7.5 4.19v7.62L4.524 9.725a1.25 1.25 0 00-.717-.226H1.5v-3h2.307c.256 0 .506-.079.717-.226z"
                        clipRule="evenodd"
                    />
                    <path d="M11.761 5.201A.75.75 0 0010.74 6.3c.494.46.761 1.074.761 1.701s-.267 1.24-.761 1.701A.75.75 0 1011.76 10.8 3.826 3.826 0 0013 8c0-1.06-.453-2.066-1.239-2.799z" />
                </g>
            </svg>
        );
    }
);
