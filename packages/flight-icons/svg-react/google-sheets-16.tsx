import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSheets16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M7.61 10.227H5.655V9.114H7.61v1.113zM7.61 8.318H5.655V7.205H7.61v1.113zM10.344 10.227H8.39V9.114h1.953v1.113zM10.344 8.318H8.39V7.205h1.953v1.113z" />
                    <path
                        fillRule="evenodd"
                        d="M13 14.046V4.5L9.562 1H3.939A.946.946 0 003 1.955v12.09c0 .528.42.955.938.955h8.124a.946.946 0 00.938-.954zM4.875 6.409v4.614h6.25V6.409h-6.25z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
