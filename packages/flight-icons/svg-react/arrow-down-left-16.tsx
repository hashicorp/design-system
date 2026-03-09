import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDownLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.72 3.22a.75.75 0 111.06 1.06L5.56 11.5h3.69a.75.75 0 010 1.5h-5.5a.748.748 0 01-.75-.75v-5.5a.75.75 0 011.5 0v3.69l7.22-7.22z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
