import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDownLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.72 5.22a.75.75 0 111.06 1.06L7.56 17.5h7.69a.75.75 0 110 1.5h-9.5a.75.75 0 01-.528-.218l-.004-.004A.75.75 0 015 18.25v-9.5a.75.75 0 011.5 0v7.69L17.72 5.22z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
