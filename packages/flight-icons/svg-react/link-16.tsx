import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLink16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M11.141 1a3.893 3.893 0 00-2.738 1.093L7.314 3.175A.75.75 0 008.372 4.24l1.077-1.07a2.393 2.393 0 013.384 3.382l-1.881 1.88a2.393 2.393 0 01-3.608-.258.75.75 0 00-1.202.899 3.893 3.893 0 005.87.42l1.886-1.886.01-.009A3.893 3.893 0 0011.14 1z" />
                    <path d="M7.019 5.365a3.893 3.893 0 00-3.032 1.13L2.102 8.382l-.01.01a3.893 3.893 0 005.505 5.504l1.084-1.084a.75.75 0 00-1.06-1.06l-1.07 1.07a2.393 2.393 0 01-3.384-3.384l1.881-1.88a2.393 2.393 0 013.609.258.75.75 0 101.2-.899A3.893 3.893 0 007.02 5.365z" />
                </g>
            </svg>
        );
    }
);
