import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMousePointer24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M3.038 2.058a.75.75 0 00-.98.98l7.29 17.5a.75.75 0 001.403-.047l2.2-6.479 5.769 5.768a.75.75 0 101.06-1.06l-5.768-5.768 6.48-2.201a.75.75 0 00.046-1.402l-17.5-7.291zm6.931 16.07L4.143 4.143l13.985 5.826-5.74 1.95a.75.75 0 00-.469.469l-1.95 5.74z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
