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
                <g fill={color}>
                    <path d="M8.75 9.75a2.25 2.25 0 101.488 3.938.75.75 0 11.993 1.124 3.75 3.75 0 110-5.625.75.75 0 01-.993 1.125A2.239 2.239 0 008.75 9.75zM14 12a2.25 2.25 0 013.738-1.688.75.75 0 10.993-1.124 3.75 3.75 0 100 5.625.75.75 0 00-.993-1.125A2.25 2.25 0 0114 12z" />
                    <path
                        fillRule="evenodd"
                        d="M.5 5.75A2.75 2.75 0 013.25 3h17.5a2.75 2.75 0 012.75 2.75v12.5A2.75 2.75 0 0120.75 21H3.25A2.75 2.75 0 01.5 18.25V5.75zM3.25 4.5C2.56 4.5 2 5.06 2 5.75v12.5c0 .69.56 1.25 1.25 1.25h17.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H3.25z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
