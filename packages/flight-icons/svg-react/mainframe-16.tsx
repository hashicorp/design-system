import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMainframe16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3 3.25A2.25 2.25 0 015.25 1h5.5A2.25 2.25 0 0113 3.25v9.5A2.25 2.25 0 0110.75 15h-5.5A2.25 2.25 0 013 12.75v-9.5zm2.25-.75a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75h-5.5zm.5 2.25A.75.75 0 016.5 4h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 2.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 2.5A.75.75 0 016.5 9h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
