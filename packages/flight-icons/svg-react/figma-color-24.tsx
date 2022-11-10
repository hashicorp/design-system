import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFigmaColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#1ABCFE"
                    d="M12.5 12c0-1.841 1.455-3.333 3.25-3.333S19 10.159 19 12c0 1.84-1.455 3.333-3.25 3.333S12.5 13.841 12.5 12z"
                />
                <path
                    fill="#0ACF83"
                    d="M6 18.667c0-1.841 1.455-3.334 3.25-3.334h3.25v3.334c0 1.84-1.455 3.333-3.25 3.333S6 20.508 6 18.667z"
                />
                <path
                    fill="#FF7262"
                    d="M12.5 2v6.667h3.25c1.795 0 3.25-1.493 3.25-3.334C19 3.493 17.545 2 15.75 2H12.5z"
                />
                <path
                    fill="#F24E1E"
                    d="M6 5.333c0 1.841 1.455 3.334 3.25 3.334h3.25V2H9.25C7.455 2 6 3.492 6 5.333z"
                />
                <path
                    fill="#A259FF"
                    d="M6 12c0 1.84 1.455 3.333 3.25 3.333h3.25V8.667H9.25C7.455 8.667 6 10.159 6 12z"
                />
            </svg>
        );
    }
);
