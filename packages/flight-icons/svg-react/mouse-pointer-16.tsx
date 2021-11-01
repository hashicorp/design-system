import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMousePointer16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2.538 1.558a.75.75 0 00-.98.98l4.79 11.5a.75.75 0 001.403-.047l1.313-3.866 3.656 3.655a.75.75 0 101.06-1.06l-3.655-3.656 3.866-1.313a.75.75 0 00.048-1.402l-11.5-4.791zm4.432 10.07L3.643 3.643l7.985 3.327-3.127 1.062a.75.75 0 00-.47.469L6.97 11.628z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
