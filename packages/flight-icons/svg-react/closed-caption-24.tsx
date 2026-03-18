import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClosedCaption24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.75 3a2.75 2.75 0 0 1 2.75 2.75v12.5A2.75 2.75 0 0 1 20.75 21H3.25A2.75 2.75 0 0 1 .5 18.25V5.75A2.75 2.75 0 0 1 3.25 3zM3.25 4.5C2.56 4.5 2 5.06 2 5.75v12.5c0 .69.56 1.25 1.25 1.25h17.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25zm5.5 3.75c.95 0 1.82.355 2.48.938a.75.75 0 0 1-.992 1.124 2.25 2.25 0 1 0 0 3.375.75.75 0 0 1 .992 1.125A3.75 3.75 0 1 1 8.75 8.25m7.5 0c.95 0 1.82.355 2.48.938a.75.75 0 0 1-.992 1.124 2.25 2.25 0 1 0 0 3.375.75.75 0 0 1 .992 1.125 3.75 3.75 0 1 1-2.48-6.562"
                />
            </svg>
        );
    }
);
