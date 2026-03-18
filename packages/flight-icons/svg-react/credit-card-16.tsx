import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCreditCard16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 2A2.25 2.25 0 0 1 16 4.25v7.5A2.25 2.25 0 0 1 13.75 14H2.25A2.25 2.25 0 0 1 0 11.75v-7.5A2.25 2.25 0 0 1 2.25 2zM1.5 11.75c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75V7h-13zM5.25 9a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm-3-5.5a.75.75 0 0 0-.75.75V5h13v-.75a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
