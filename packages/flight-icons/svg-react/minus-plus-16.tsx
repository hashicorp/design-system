import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinusPlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 7.75a.75.75 0 0 1 .75.75V10h1.5a.75.75 0 1 1 0 1.5H13V13a.75.75 0 0 1-1.5 0v-1.5H10a.75.75 0 0 1 0-1.5h1.5V8.5a.75.75 0 0 1 .75-.75m-.53-4.53a.75.75 0 1 1 1.06 1.06l-8.5 8.5a.75.75 0 0 1-1.06-1.06zM6.75 4a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
