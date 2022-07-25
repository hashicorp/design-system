import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsS324 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8.888 3.32l3.028-1.632 3.028 1.632.006 4.517-3.025.504-3.037-.509V3.32z" />
                    <path d="M4.793 5.24l3.345.949v2.278l2.298.385-2.285.254v5.843l2.294.268-2.294.426v2.33l-3.358.864v-.012l-1.12-.508V5.77l1.12-.51v-.02zM15.7 15.643v2.815l3.197.374 1.43-.816V6.07l-1.43-.816-3.2.374.004 2.844-2.282.38 2.28.254v5.843l-2.29.268 2.29.426z" />
                    <path d="M8.9 16.267l3.029-.562 3.02.562v4.428l-3.024 1.617-3.024-1.617v-4.428zM8.9 9.777l3.025-.336 3.025.336v4.505l-3.025.353-3.024-.353V9.777z" />
                </g>
            </svg>
        );
    }
);
