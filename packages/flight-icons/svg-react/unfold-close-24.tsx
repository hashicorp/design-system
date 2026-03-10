import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUnfoldClose24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 15c.205 0 .401.084.543.232l5.25 5.5a.75.75 0 01-1.086 1.036L12 16.836l-4.707 4.932a.75.75 0 01-1.086-1.035l5.25-5.5A.751.751 0 0112 15zm-9.25-4a.75.75 0 110 1.5h-1.5a.75.75 0 010-1.5h1.5zm5 0a.75.75 0 110 1.5h-1.5a.75.75 0 010-1.5h1.5zm5 0a.75.75 0 110 1.5h-1.5a.75.75 0 010-1.5h1.5zm5 0a.75.75 0 110 1.5h-1.5a.75.75 0 010-1.5h1.5zm5 0a.75.75 0 110 1.5h-1.5a.75.75 0 010-1.5h1.5zm-6.043-8.768a.75.75 0 011.086 1.036l-5.25 5.5a.751.751 0 01-1.086 0l-5.25-5.5a.75.75 0 011.086-1.036L12 7.164l4.707-4.932z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
