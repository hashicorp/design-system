import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSortDesc16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M2.25 3.75A.75.75 0 013 3h10a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM3 6a.75.75 0 000 1.5h6A.75.75 0 009 6H3zM11.963 13.943a.747.747 0 00.817-.163l3-3a.75.75 0 10-1.06-1.06L13 11.44V6.75a.75.75 0 00-1.5 0v4.69L9.78 9.72a.75.75 0 00-1.06 1.06l3 3a.748.748 0 00.243.163zM3 9a.75.75 0 000 1.5h3A.75.75 0 006 9H3zM2.25 12.75A.75.75 0 013 12h3a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" />
                </g>
            </svg>
        );
    }
);
