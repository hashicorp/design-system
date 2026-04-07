import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconApi24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19 2a3 3 0 1 1-1.524 5.585l-1.79 1.79.68.68a2.75 2.75 0 0 1 0 3.89l-.68.68 1.79 1.79a3 3 0 1 1-1.06 1.06l-1.791-1.79-.68.681a2.75 2.75 0 0 1-3.89 0l-.68-.68-1.79 1.79A3.001 3.001 0 1 1 2 19a3 3 0 0 1 4.523-2.585l1.791-1.79-.68-.68a2.75 2.75 0 0 1 0-3.89l.68-.68-1.79-1.79a3 3 0 1 1 1.062-1.062l1.789 1.792.68-.681a2.75 2.75 0 0 1 3.89 0l.68.68 1.79-1.79A3 3 0 0 1 19 2M5 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m14 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-6.116-8.806a1.25 1.25 0 0 0-1.768 0l-2.422 2.422a1.25 1.25 0 0 0 0 1.768l2.422 2.422a1.25 1.25 0 0 0 1.768 0l2.422-2.422a1.25 1.25 0 0 0 0-1.768zM5 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m14 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
