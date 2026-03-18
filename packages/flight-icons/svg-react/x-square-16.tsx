import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconXSquare16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.139 2.5a.64.64 0 0 0-.639.639v9.722c0 .353.286.639.639.639h9.722a.64.64 0 0 0 .639-.639V3.14a.64.64 0 0 0-.639-.639zM1 3.139C1 1.958 1.958 1 3.139 1h9.722C14.042 1 15 1.958 15 3.139v9.722A2.14 2.14 0 0 1 12.861 15H3.14A2.14 2.14 0 0 1 1 12.861zm3.72 1.58a.75.75 0 0 1 1.06 0L8 6.94l2.22-2.22a.75.75 0 1 1 1.06 1.061L9.06 8l2.22 2.22a.75.75 0 1 1-1.06 1.06L8 9.06l-2.22 2.22a.75.75 0 0 1-1.06-1.06L6.94 8 4.72 5.78a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
