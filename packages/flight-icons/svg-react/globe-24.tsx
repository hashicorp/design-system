import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGlobe24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1M2.513 12.5c.23 4.45 3.525 8.091 7.814 8.854a16.7 16.7 0 0 1-3.06-8.854zm14.22 0a16.7 16.7 0 0 1-3.06 8.854c4.289-.763 7.583-4.403 7.814-8.854zm-7.964 0A15.16 15.16 0 0 0 12 21.084a15.16 15.16 0 0 0 3.231-8.584zm1.558-9.854A9.51 9.51 0 0 0 2.552 11h4.747a16.7 16.7 0 0 1 3.028-8.354m1.673.27A15.15 15.15 0 0 0 8.804 11h6.392A15.15 15.15 0 0 0 12 2.916m1.673-.27A16.7 16.7 0 0 1 16.7 11h4.747a9.51 9.51 0 0 0-7.775-8.354"
                />
            </svg>
        );
    }
);
