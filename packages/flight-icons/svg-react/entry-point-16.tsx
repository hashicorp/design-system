import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEntryPoint16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1a7 7 0 11-5.8 10.92.75.75 0 011.242-.84 5.5 5.5 0 100-6.158.75.75 0 01-1.242-.843A6.994 6.994 0 018 1zm-.755 3.695a.75.75 0 011.06.05l2.5 2.75c.26.286.26.724 0 1.01l-2.5 2.75a.75.75 0 01-1.11-1.01l1.36-1.495H1.75a.75.75 0 010-1.5h6.805l-1.36-1.495a.75.75 0 01.05-1.06z"
                />
            </svg>
        );
    }
);
