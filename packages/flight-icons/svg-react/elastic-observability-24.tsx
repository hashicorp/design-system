import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconElasticObservability24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.75 22h5.625V7.143c0-2.81-1.959-5.098-4.392-5.128L15.75 2v20zm-1.875 0V7H8.25v4.375H2.625v6.248C2.625 20.04 4.371 22 6.524 22h7.351z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
