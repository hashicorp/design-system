import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowRightCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19m.205 4.735a.75.75 0 0 1 1.06-.03l4.5 4.25a.75.75 0 0 1 0 1.09l-4.5 4.25a.75.75 0 1 1-1.03-1.09l3.128-2.955H6.75a.75.75 0 0 1 0-1.5h8.613l-3.128-2.955a.75.75 0 0 1-.03-1.06"
                />
            </svg>
        );
    }
);
