import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCrop24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M6.5 1.25a.75.75 0 00-1.5 0V5H1.25a.75.75 0 000 1.5H5v9.75A2.75 2.75 0 007.75 19h9.75v3.75a.75.75 0 001.5 0V19h3.75a.75.75 0 000-1.5H19V7.75A2.75 2.75 0 0016.25 5H6.5V1.25zm0 5.25v9.75a1.25 1.25 0 001.25 1.25h9.75V7.75a1.25 1.25 0 00-1.25-1.25H6.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
