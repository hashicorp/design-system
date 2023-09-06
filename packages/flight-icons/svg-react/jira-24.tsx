import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconJira24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M22.252 11.392L11.985 1 1.748 11.362c-.33.334-.33.881 0 1.246l6.424 6.502L11.985 23l10.267-10.392a.87.87 0 000-1.216zm-10.267 3.86L8.773 12l3.212-3.251L15.197 12l-3.212 3.251z"
                />
            </svg>
        );
    }
);
