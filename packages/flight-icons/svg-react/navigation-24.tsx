import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconNavigation24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.78 2.22a.75.75 0 01.148.851l-8.763 18.5a.75.75 0 01-1.406-.14L9.921 14.08l-7.353-1.838a.75.75 0 01-.14-1.406L20.93 2.072a.75.75 0 01.851.148zM4.965 11.294l5.756 1.439a.75.75 0 01.546.546l1.44 5.756 6.966-14.708-14.708 6.967z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
