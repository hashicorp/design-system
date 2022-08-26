import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStep16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 14a.75.75 0 000-1.5h-3a1.75 1.75 0 01-1.75-1.75v-.25a1.75 1.75 0 001.75-1.75v-1.5A1.75 1.75 0 007.5 5.5V2.75a.75.75 0 00-1.5 0V5.5a1.75 1.75 0 00-1.75 1.75v1.5c0 .966.784 1.75 1.75 1.75v.25A3.25 3.25 0 009.25 14h3zm-6.5-6.75A.25.25 0 016 7h1.5a.25.25 0 01.25.25v1.5A.25.25 0 017.5 9H6a.25.25 0 01-.25-.25v-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
