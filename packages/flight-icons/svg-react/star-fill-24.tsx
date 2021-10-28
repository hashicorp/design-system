import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconStarFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M12.673 1.418a.75.75 0 00-1.345 0L8.335 7.483l-6.693.978a.75.75 0 00-.415 1.28l4.842 4.717-1.143 6.665a.75.75 0 001.089.79L12 18.766l5.985 3.149a.75.75 0 001.089-.79l-1.143-6.666 4.842-4.717a.75.75 0 00-.415-1.28l-6.693-.978-2.992-6.065z"
                />
            </svg>
        );
    }
);
