import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconX24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.721 5.22a.75.75 0 011.06 1.061l-5.719 5.72 5.72 5.72a.754.754 0 010 1.06.753.753 0 01-1.06 0l-5.72-5.72-5.72 5.72a.75.75 0 01-1.06-1.06L10.94 12l-5.72-5.72a.75.75 0 011.06-1.06l5.72 5.72 5.72-5.72z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
