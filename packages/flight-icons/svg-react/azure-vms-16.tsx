import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureVms16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.006 5.309 8 4.172 9.994 5.31 8 6.475zM8.348 6.679l1.822-1.066v2.132zM8.175 6.985l1.819 1.064-1.819 1.036zM7.825 6.985v2.1L6.006 8.05zM5.83 5.613v2.132l1.822-1.066z" />
                    <path
                        fillRule="evenodd"
                        d="M14.533 2H1.467A.47.47 0 0 0 1 2.469v8.443c0 .259.209.469.467.469h5.156c0 1.618-.046 2.618-1.43 2.837A.776.776 0 0 0 4.5 15h7a.784.784 0 0 0-.692-.782c-1.385-.219-1.44-1.22-1.44-2.837h5.165c.258 0 .467-.21.467-.47V2.47A.47.47 0 0 0 14.533 2M10.52 5.204 8 3.768 5.48 5.204v2.95L8 9.59l2.52-1.437z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
