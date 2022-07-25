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
                    <path d="M6.006 5.309L8 4.172 9.994 5.31 8 6.475 6.006 5.31zM8.348 6.679l1.822-1.066v2.132L8.348 6.679zM8.175 6.985l1.819 1.064-1.819 1.036v-2.1zM7.825 6.985v2.1L6.006 8.05l1.82-1.064zM5.83 5.613v2.132l1.822-1.066L5.83 5.613z" />
                    <path
                        fillRule="evenodd"
                        d="M14.533 2H1.467A.468.468 0 001 2.469v8.443c0 .259.209.469.467.469h5.156c0 1.618-.046 2.618-1.43 2.837A.776.776 0 004.5 15h7a.784.784 0 00-.692-.782c-1.385-.219-1.44-1.22-1.44-2.837h5.165c.258 0 .467-.21.467-.47V2.47A.468.468 0 0014.533 2zM10.52 5.204L8 3.768 5.48 5.204v2.95L8 9.59l2.52-1.437V5.204z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
