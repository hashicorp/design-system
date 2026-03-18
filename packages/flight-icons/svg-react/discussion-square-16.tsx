import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDiscussionSquare16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 4A2.25 2.25 0 0 1 16 6.25v8a.75.75 0 0 1-1.19.607l-2.518-1.823H6.25A2.25 2.25 0 0 1 4 10.784V6.25A2.25 2.25 0 0 1 6.25 4zm-7.5 1.5a.75.75 0 0 0-.75.75v4.534c0 .414.336.75.75.75h6.284c.158 0 .313.05.44.143L14.5 12.78V6.25a.75.75 0 0 0-.75-.75zm5-4.5a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 0-.75.75v6.531l.706-.51a.75.75 0 1 1 .879 1.214l-1.896 1.372A.75.75 0 0 1 0 11.25v-8A2.25 2.25 0 0 1 2.25 1z"
                />
            </svg>
        );
    }
);
