import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGitBranch24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7 3.25a.75.75 0 00-1.5 0v10.83a3.501 3.501 0 104.171 4.162c2.447-.091 4.553-.979 6.073-2.498 1.467-1.468 2.345-3.481 2.486-5.82A3.501 3.501 0 0017.5 3a3.5 3.5 0 00-.773 6.914c-.136 1.976-.88 3.604-2.044 4.769-1.213 1.213-2.929 1.97-5.015 2.058A3.505 3.505 0 007 14.081V3.25zM17.5 8.5a2 2 0 100-4 2 2 0 000 4zm-13.25 9a2 2 0 114 0 2 2 0 01-4 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
