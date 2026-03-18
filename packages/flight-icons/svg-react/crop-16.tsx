import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCrop16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.75.5a.75.75 0 0 1 .75.75V3h6.456A2.044 2.044 0 0 1 13 5.044V11.5h1.75a.75.75 0 0 1 0 1.5H13v1.75a.75.75 0 0 1-1.5 0V13H5.044A2.044 2.044 0 0 1 3 10.956V4.5H1.25a.75.75 0 0 1 0-1.5H3V1.25A.75.75 0 0 1 3.75.5m.75 10.456a.544.544 0 0 0 .544.544H11.5V5.044a.544.544 0 0 0-.544-.544H4.5z"
                />
            </svg>
        );
    }
);
