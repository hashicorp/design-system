import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVolumeUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.72 4.219a.75.75 0 0 1 1.06 0 11.01 11.01 0 0 1 0 15.561.75.75 0 0 1-1.06-1.06 9.51 9.51 0 0 0 0-13.44.75.75 0 0 1 0-1.061m-9.673.585c1.115-1.056 2.952-.265 2.953 1.27v11.85c0 1.537-1.838 2.327-2.953 1.271l-3.3-3.127A.25.25 0 0 0 5.573 16H2.75A1.75 1.75 0 0 1 1 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.824a.25.25 0 0 0 .172-.068zm1.453 1.27a.25.25 0 0 0-.422-.18l-3.3 3.127a1.75 1.75 0 0 1-1.204.479H2.75a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h2.824c.448 0 .878.172 1.203.48l3.301 3.126a.25.25 0 0 0 .422-.181zm4.71 1.905a.75.75 0 0 1 1.061-.018A5.62 5.62 0 0 1 18 12c0 1.52-.625 2.972-1.729 4.04a.75.75 0 0 1-1.043-1.08A4.12 4.12 0 0 0 16.5 12a4.12 4.12 0 0 0-1.271-2.96.75.75 0 0 1-.018-1.061"
                />
            </svg>
        );
    }
);
