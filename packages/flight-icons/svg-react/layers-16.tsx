import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLayers16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.887 10.592a.751.751 0 0 1 .725 1.314l-7.25 4a.75.75 0 0 1-.724 0l-7.25-4a.75.75 0 0 1 .724-1.314L8 14.393zm0-3.5a.751.751 0 0 1 .725 1.314l-7.25 4a.75.75 0 0 1-.724 0l-7.25-4a.75.75 0 0 1 .724-1.314L8 10.893zM7.655.084a.75.75 0 0 1 .69 0l7.25 3.75a.75.75 0 0 1 0 1.332l-7.25 3.75a.75.75 0 0 1-.69 0l-7.25-3.75a.752.752 0 0 1 0-1.332zM2.383 4.5 8 7.405 13.618 4.5 8 1.595z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
