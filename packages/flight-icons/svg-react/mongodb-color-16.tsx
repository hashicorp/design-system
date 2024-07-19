import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMongodbColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#00ED64"
                    d="M9.488 1.783A28.69 28.69 0 018.023.01a.034.034 0 00-.046 0C7.85.177 7.23.987 6.512 1.783c-6.172 7.351.972 12.312.972 12.312l.06.038c.053.765.186 1.867.186 1.867h.533s.133-1.095.187-1.867l.06-.044c.006 0 7.15-4.955.978-12.306zm-1.491 12.2s-.32-.255-.406-.386v-.012l.386-8.005c0-.025.04-.025.04 0l.386 8.005v.012c-.087.131-.406.386-.406.386z"
                />
            </svg>
        );
    }
);
