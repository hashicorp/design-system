import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSend24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.205 5.042c.516-1.4-.846-2.763-2.247-2.247L3.264 8.577c-1.318.486-1.555 2.25-.412 3.066l5.51 3.936a.252.252 0 01.059.058l3.936 5.51c.817 1.144 2.58.907 3.066-.411l5.782-15.694zm-1.729-.84a.25.25 0 01.321.322l-5.782 15.693a.25.25 0 01-.438.059l-3.663-5.13L15.53 9.53a.75.75 0 00-1.06-1.06l-5.617 5.616-5.129-3.663a.25.25 0 01.059-.438l15.693-5.782z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
