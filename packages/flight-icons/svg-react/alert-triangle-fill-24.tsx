import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertTriangleFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M12 2c.472 0 .934.127 1.342.366.407.24.746.581.984.99l.002.004 8.316 14.46a2.86 2.86 0 01.006 2.758 2.758 2.758 0 01-.975 1.03c-.41.25-.877.386-1.357.392H3.682a2.654 2.654 0 01-1.357-.393 2.759 2.759 0 01-.975-1.029 2.862 2.862 0 01.007-2.758l.005-.01L9.674 3.357c.238-.409.577-.75.984-.99C11.066 2.127 11.528 2 12 2zm0 14a1 1 0 000 2h.01a1 1 0 100-2H12zm0-8a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 8z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
