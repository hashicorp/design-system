import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconYoutubeColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="red"
                    d="M22.547 6.708a2.757 2.757 0 00-1.94-1.939C18.888 4.316 12 4.316 12 4.316s-6.886 0-8.608.453a2.756 2.756 0 00-1.939 1.94C1 8.43 1 12 1 12s0 3.588.453 5.292a2.756 2.756 0 001.94 1.939c1.72.453 8.607.453 8.607.453s6.886 0 8.608-.453a2.757 2.757 0 001.939-1.94c.453-1.72.453-5.29.453-5.29s0-3.57-.453-5.292z"
                />
                <path
                    fill="#fff"
                    d="M9.79 15.316l5.726-3.298-5.727-3.316v6.614z"
                />
            </svg>
        );
    }
);
