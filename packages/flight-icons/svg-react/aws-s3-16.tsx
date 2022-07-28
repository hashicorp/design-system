import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsS316 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.258 1.687L8.439.5l2.182 1.187.005 3.285-2.18.367-2.188-.37V1.687z" />
                    <path d="M3.307 3.083l2.41.69V5.43l1.656.28-1.647.185v4.25l1.653.195-1.653.31v1.695l-2.419.627v-.008l-.807-.37V3.469l.807-.37v-.016zM11.166 10.65v2.047l2.304.272 1.03-.594V3.688l-1.03-.594-2.306.272.003 2.068-1.645.277 1.644.184v4.25l-1.651.195 1.651.31z" />
                    <path d="M6.267 11.103l2.182-.409 2.177.41v3.22L8.446 15.5l-2.18-1.176v-3.22zM6.267 6.383l2.18-.244 2.179.244V9.66l-2.18.257-2.18-.257V6.383z" />
                </g>
            </svg>
        );
    }
);
