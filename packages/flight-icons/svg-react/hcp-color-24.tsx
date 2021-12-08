import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHcpColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#000">
                    <path d="M10.336 1.5L2 6.268v11.456l3.131 1.793V8.061l5.205-2.979V1.5z" />
                    <path d="M13.664 1.5v9.123h-3.328V7.219L7.203 9.012V20.7l3.133 1.796V13.4h3.328v3.381l3.131-1.793V3.293L13.664 1.5z" />
                    <path d="M13.664 22.5L22 17.732V6.276l-3.133-1.793v11.456l-5.203 2.979V22.5z" />
                </g>
            </svg>
        );
    }
);
