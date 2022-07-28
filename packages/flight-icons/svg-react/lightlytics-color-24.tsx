import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLightlyticsColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#7B00F4"
                    d="M5.832 22h8.083L22 10.237h-7.666L5.832 22z"
                />
                <path
                    fill="#B627FF"
                    d="M12 2h8.082l-5.686 8.237H22l-4.49 6.528H2L12 2z"
                />
                <path
                    fill="#000"
                    d="M8.107 18.883l9.07-2.118H9.604l-1.497 2.118z"
                    opacity={0.4}
                />
            </svg>
        );
    }
);
