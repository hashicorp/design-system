import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIdentityService16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M8 5a4 4 0 100 8 4 4 0 000-8zm-.904 3H5.708a2.504 2.504 0 011.847-1.46A5.94 5.94 0 007.096 8zm-.068 1.5H5.55c.203.998 1 1.78 2.005 1.96a6.01 6.01 0 01-.527-1.96zm2.103 1.73a4.376 4.376 0 01-.594-1.73h1.913a2.504 2.504 0 01-1.319 1.73zM8.628 8c.107-.445.278-.862.503-1.23A2.51 2.51 0 0110.292 8H8.628z" />
                    <path d="M4 1.25C4 .56 4.56 0 5.25 0h5.5C11.44 0 12 .56 12 1.25V2h1.75A2.25 2.25 0 0116 4.25v8.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-8.5A2.25 2.25 0 012.25 2H4v-.75zM10.75 4c.409 0 .772-.196 1-.5h2a.75.75 0 01.75.75v8.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-8.5a.75.75 0 01.75-.75h2c.228.304.591.5 1 .5h5.5zM5.5 2.5h5v-1h-5v1z" />
                </g>
            </svg>
        );
    }
);
