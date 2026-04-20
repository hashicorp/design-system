import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHeartFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.434 1a4.574 4.574 0 0 1 3.226 1.322 4.486 4.486 0 0 1 0 6.4l-6.133 6.061a.75.75 0 0 1-1.054 0L1.34 8.723A4.5 4.5 0 0 1 0 5.523C0 4.32.484 3.168 1.34 2.32A4.6 4.6 0 0 1 4.567 1a4.6 4.6 0 0 1 3.226 1.321L8 2.527l.208-.205A4.57 4.57 0 0 1 11.434 1"
                />
            </svg>
        );
    }
);
