import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHashicorpFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#000"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.272 3.375-3.647 2.1v5.046l1.37.79V6.265l2.277-1.312zm1.456 0v4.018H7.272v-1.5l-1.37.79v5.149l1.37.791V8.616h1.456v1.49l1.37-.79V4.165zm0 9.25 3.647-2.1V5.479l-1.37-.79v5.046l-2.277 1.312z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
