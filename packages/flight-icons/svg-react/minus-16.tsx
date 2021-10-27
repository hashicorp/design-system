import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMinus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
