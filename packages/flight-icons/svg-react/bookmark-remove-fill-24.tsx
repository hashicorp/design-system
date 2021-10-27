import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBookmarkRemoveFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M4 4.75A2.75 2.75 0 016.75 2h10.5A2.75 2.75 0 0120 4.75v16.376a1 1 0 01-1.382.924l-6.522-2.699a.25.25 0 00-.192 0L5.382 22.05A1 1 0 014 21.126V4.75zM8.75 10a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
