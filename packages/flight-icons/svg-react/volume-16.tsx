import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVolume16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M7.5 4.19L4.524 6.274a1.25 1.25 0 01-.717.226H1.5v3h2.307c.256 0 .506.079.717.226L7.5 11.809V4.191zm-.467-1.504A1.25 1.25 0 019 3.71v8.58a1.25 1.25 0 01-1.967 1.024L3.728 11H1.25C.56 11 0 10.44 0 9.75v-3.5C0 5.56.56 5 1.25 5h2.478l3.305-2.314z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
