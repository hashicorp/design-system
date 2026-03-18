import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLightlyticsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#7b00f4" d="M3.682 15h5.659L15 6.766H9.634z" />
                <path
                    fill="#b627ff"
                    d="M8 1h5.658l-3.98 5.766H15l-3.143 4.57H1z"
                />
                <path fill="#000" d="m5.275 12.818 6.35-1.482H6.322z" />
            </svg>
        );
    }
);
