import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHourglass16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.987.5a1.5 1.5 0 011.318 2.217L10.493 7.88a.25.25 0 000 .238l2.812 5.164a1.5 1.5 0 01-1.318 2.217H4.012a1.5 1.5 0 01-1.318-2.217L5.506 8.12a.253.253 0 000-.238L2.694 2.717A1.5 1.5 0 014.012.5h7.975zM6.823 7.163a1.753 1.753 0 010 1.674L4.012 14h7.975L9.176 8.837a1.75 1.75 0 010-1.674L11.987 2H4.012l2.811 5.163zM9.5 12c.413.001.75.336.75.75a.752.752 0 01-.75.75h-3a.75.75 0 010-1.5h3zM8.25 4.5c.413.001.75.336.75.75a.752.752 0 01-.75.75h-.5a.75.75 0 010-1.5h.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
