import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGit16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.003 15a.9.9 0 0 1-.626-.264L1.264 8.623a.903.903 0 0 1 0-1.275l4.192-4.19 1.587 1.587a1.074 1.074 0 0 0 .582 1.407v3.843A1.077 1.077 0 0 0 7.04 11.4a1.072 1.072 0 1 0 1.466-1.372V6.218l1.448 1.447a1.073 1.073 0 1 0 .642-.604L9.045 5.509a1.072 1.072 0 0 0-1.356-1.365l-1.61-1.61 1.27-1.27a.9.9 0 0 1 1.275 0l6.112 6.113a.9.9 0 0 1 .264.616v.042a.9.9 0 0 1-.264.617l-6.084 6.084a.9.9 0 0 1-.626.264z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
