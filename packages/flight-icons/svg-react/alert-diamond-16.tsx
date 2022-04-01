import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamond16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M7 11a1 1 0 011-1h.007a1 1 0 110 2H8a1 1 0 01-1-1zM8.75 5.75a.75.75 0 10-1.5 0v2.5a.75.75 0 101.5 0v-2.5z" />
                    <path
                        fillRule="evenodd"
                        d="M.75 6.41L6.407.752a2.25 2.25 0 013.182 0l5.657 5.656a2.25 2.25 0 010 3.182l-5.657 5.657a2.25 2.25 0 01-3.182 0L.75 9.591a2.25 2.25 0 010-3.182zm6.718-4.597L1.81 7.47a.75.75 0 000 1.06l5.657 5.657a.75.75 0 001.06 0l5.657-5.656a.75.75 0 000-1.061L8.528 1.813a.75.75 0 00-1.06 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
