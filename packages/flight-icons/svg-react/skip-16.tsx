import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSkip16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 110 16A8 8 0 018 0zM3.965 13.096a6.5 6.5 0 009.13-9.13l-9.13 9.13zM8 1.5a6.5 6.5 0 00-5.096 10.535l9.131-9.13A6.472 6.472 0 008 1.5z"
                />
            </svg>
        );
    }
);
