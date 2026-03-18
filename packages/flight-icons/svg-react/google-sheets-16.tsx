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
                    <path d="M7.61 10.227H5.655V9.114H7.61zM7.61 8.318H5.655V7.205H7.61zM10.344 10.227H8.39V9.114h1.953zM10.344 8.318H8.39V7.205h1.953z" />
                    <path
                        fillRule="evenodd"
                        d="M13 14.046V4.5L9.563 1H3.936A.946.946 0 0 0 3 1.955v12.09c0 .528.42.955.938.955h8.124a.946.946 0 0 0 .938-.954M4.875 6.409v4.614h6.25V6.409z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
