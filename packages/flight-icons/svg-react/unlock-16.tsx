import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUnlock16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 0a3.96 3.96 0 0 1 2.835 1.203A4.13 4.13 0 0 1 16 4.083a.75.75 0 0 1-1.5 0c0-.691-.268-1.35-.74-1.833A2.46 2.46 0 0 0 12 1.5c-.657 0-1.29.268-1.76.75a2.63 2.63 0 0 0-.74 1.833V5h.25A2.25 2.25 0 0 1 12 7.25v5.5A2.25 2.25 0 0 1 9.75 15h-7.5A2.25 2.25 0 0 1 0 12.75v-5.5A2.25 2.25 0 0 1 2.25 5H8v-.917c0-1.077.417-2.113 1.165-2.88A3.96 3.96 0 0 1 12 0M2.25 6.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
