import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconElasticObservability16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.625 15h3.938V4.6c0-1.968-1.372-3.569-3.075-3.59L10.625 1v14zm-1.313 0V4.5H5.376v3.063H1.437v4.373C1.438 13.628 2.66 15 4.168 15h5.146z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
