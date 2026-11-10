import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigation24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.928 2.073a.75.75 0 0 1 .852.148.75.75 0 0 1 .147.851l-8.763 18.5a.755.755 0 0 1-.751.425.76.76 0 0 1-.655-.564L9.92 14.08l-7.352-1.839a.75.75 0 0 1-.565-.653.75.75 0 0 1 .425-.752zM4.964 11.295l5.756 1.439a.76.76 0 0 1 .546.546l1.44 5.756 6.966-14.708z"
                />
            </svg>
        );
    }
);
