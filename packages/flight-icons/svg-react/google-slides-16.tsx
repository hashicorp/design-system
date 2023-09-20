import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSlides16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M10.344 7.315H5.656v2.753h4.688V7.315z" />
                    <path
                        fillRule="evenodd"
                        d="M3.938 15.25h8.124c.516 0 .938-.437.938-.972V4.562L9.563 1H3.937C3.422 1 3 1.437 3 1.972v12.306c0 .535.422.972.938.972zm7.187-8.744h-6.25v4.372h6.25V6.506z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
