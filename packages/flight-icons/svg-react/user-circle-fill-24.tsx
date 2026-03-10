import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCircleFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 .25C18.49.25 23.75 5.51 23.75 12S18.49 23.75 12 23.75.25 18.49.25 12 5.51.25 12 .25zM8 14a4 4 0 00-4 4v.25a.75.75 0 001.5 0V18A2.5 2.5 0 018 15.5h8a2.5 2.5 0 012.5 2.5v.25a.75.75 0 001.5 0V18a4 4 0 00-4-4H8zm4-10.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM12 5a3 3 0 110 6 3 3 0 010-6z"
                />
            </svg>
        );
    }
);
