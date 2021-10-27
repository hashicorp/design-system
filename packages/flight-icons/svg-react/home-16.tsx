import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHome16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M7.846 2.574a.25.25 0 01.308 0l5.25 4.12a.25.25 0 01.096.196v7.36a.75.75 0 001.5 0V6.89a1.75 1.75 0 00-.67-1.377L9.08 1.394a1.75 1.75 0 00-2.16 0l-5.25 4.12A1.75 1.75 0 001 6.89v7.36a.75.75 0 001.5 0V6.89a.25.25 0 01.096-.196l5.25-4.12z" />
                    <path d="M6.5 14.25V10.5h3v3.75a.75.75 0 001.5 0v-4C11 9.56 10.44 9 9.75 9h-3.5C5.56 9 5 9.56 5 10.25v4a.75.75 0 001.5 0z" />
                </g>
            </svg>
        );
    }
);
