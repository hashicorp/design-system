import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWand24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.482 6.707a2.501 2.501 0 0 1 3.536 3.535L5.703 21.556a2.501 2.501 0 0 1-3.535-3.536zM3.229 19.08a1.001 1.001 0 0 0 1.414 1.415l8.662-8.662-1.414-1.415zm15.178-6.07a.75.75 0 0 1 1.378 0l.572 1.335a.75.75 0 0 0 .394.393l1.333.571a.751.751 0 0 1 0 1.38l-1.333.57a.75.75 0 0 0-.394.394l-.572 1.333a.75.75 0 0 1-1.378 0l-.572-1.333a.75.75 0 0 0-.393-.393l-1.333-.572a.75.75 0 0 1 0-1.379l1.333-.571a.75.75 0 0 0 .393-.394zm-2.45-5.244a1 1 0 0 0-1.415 0l-1.59 1.591 1.414 1.415 1.591-1.592c.39-.39.39-1.023 0-1.414M6.15 2.125a.75.75 0 0 1 .975-.976l1.097.439c.178.07.378.071.557 0l1.096-.439a.75.75 0 0 1 .975.976L10.41 3.22a.75.75 0 0 0 0 .557l.439 1.097a.75.75 0 0 1-.975.974L8.78 5.411a.75.75 0 0 0-.557 0l-1.097.438a.75.75 0 0 1-.975-.974l.44-1.097a.75.75 0 0 0 0-.557zm11.75 0a.75.75 0 0 1 .975-.976l.722.29c.178.07.378.07.556 0l.722-.29a.75.75 0 0 1 .975.976l-.288.721a.75.75 0 0 0 0 .557l.288.722a.75.75 0 0 1-.975.974l-.721-.288a.75.75 0 0 0-.557 0l-.722.288a.75.75 0 0 1-.975-.974l.289-.722a.75.75 0 0 0 0-.557z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
