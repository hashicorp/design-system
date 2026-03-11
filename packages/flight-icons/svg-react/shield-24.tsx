import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShield24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.04 1.308c.62-.23 1.302-.231 1.92 0l6.25 2.33A2.751 2.751 0 0121 6.214V12c0 2.732-1.462 5.038-3.104 6.774-1.649 1.744-3.561 3-4.649 3.642a2.439 2.439 0 01-2.494 0c-1.088-.642-3-1.898-4.65-3.642C4.463 17.038 3 14.731 3 12V6.214c0-1.148.715-2.175 1.79-2.576l6.25-2.33zm1.397 1.406a1.251 1.251 0 00-.873 0l-6.25 2.329c-.49.182-.813.65-.814 1.17V12c0 2.182 1.173 4.136 2.693 5.744 1.514 1.6 3.294 2.773 4.324 3.381a.937.937 0 00.966 0c1.03-.608 2.81-1.781 4.324-3.38C18.327 16.135 19.5 14.181 19.5 12V6.214c0-.522-.325-.989-.814-1.171l-6.25-2.33z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
