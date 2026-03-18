import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSupport16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m2.248 11.309A4 4 0 0 1 8 12a4 4 0 0 1-2.248-.691l-1.787 1.787A6.47 6.47 0 0 0 8 14.5a6.47 6.47 0 0 0 4.035-1.404zM2.904 3.965A6.47 6.47 0 0 0 1.5 8c0 1.525.525 2.927 1.404 4.035l1.787-1.787A4 4 0 0 1 4 8c0-.834.255-1.607.691-2.248zm8.405 1.787A4 4 0 0 1 12 8a4 4 0 0 1-.691 2.248l1.787 1.787A6.47 6.47 0 0 0 14.5 8a6.47 6.47 0 0 0-1.404-4.035zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0-4a6.47 6.47 0 0 0-4.035 1.404l1.787 1.787A4 4 0 0 1 8 4a4 4 0 0 1 2.248.691l1.787-1.787A6.47 6.47 0 0 0 8 1.5"
                />
            </svg>
        );
    }
);
