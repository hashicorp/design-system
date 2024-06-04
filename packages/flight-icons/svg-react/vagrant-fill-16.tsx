import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrantFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.542 3.974H3.625V6.1l2.917 5.926h2.916L6.542 6.1V3.974zm2.916 0V6.1l-1.21 2.457 1.459 2.962 2.668-5.42V3.975H9.458z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
