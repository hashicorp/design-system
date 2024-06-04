import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrant24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 1.878h7.333v5.344l7.334 14.9H8.333L1 7.222V1.878zm14.667 5.344V1.878H23v5.344l-6.708 13.626-3.67-7.447 3.045-6.179z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
