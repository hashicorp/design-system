import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerraformColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#7B42BC" fillRule="evenodd" clipRule="evenodd">
                    <path d="M8.893 4.618l6.214 3.597v7.2l-6.214-3.6V4.618zM15.788 8.215v7.2l6.212-3.6V4.618l-6.212 3.597zM2 .6v7.197l6.212 3.6V4.2L2 .6zM8.893 19.8l6.212 3.6v-7.197l-6.212-3.6V19.8z" />
                </g>
            </svg>
        );
    }
);
