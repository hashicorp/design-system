import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStarCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M12.669 4.91a.75.75 0 00-1.338 0l-1.91 3.767-4.277.608a.75.75 0 00-.41 1.287l3.082 2.923-.726 4.125a.75.75 0 001.08.798L12 16.457l3.83 1.96a.75.75 0 001.08-.797l-.726-4.125 3.082-2.923a.75.75 0 00-.41-1.287l-4.278-.608L12.67 4.91zm-2.086 4.793L12 6.91l1.417 2.794a.75.75 0 00.563.404l3.128.445-2.25 2.132a.75.75 0 00-.222.675l.535 3.036-2.83-1.448a.75.75 0 00-.683 0l-2.83 1.448.536-3.036a.75.75 0 00-.223-.675l-2.249-2.132 3.128-.445a.75.75 0 00.563-.404z" />
                    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" />
                </g>
            </svg>
        );
    }
);
