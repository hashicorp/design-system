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
                    d="M12 .25C18.49.25 23.75 5.51 23.75 12S18.49 23.75 12 23.75.25 18.49.25 12 5.51.25 12 .25M8 14a4 4 0 0 0-4 4v.25a.75.75 0 0 0 1.5 0V18A2.5 2.5 0 0 1 8 15.5h8a2.5 2.5 0 0 1 2.5 2.5v.25a.75.75 0 0 0 1.5 0V18a4 4 0 0 0-4-4zm4-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6"
                />
            </svg>
        );
    }
);
