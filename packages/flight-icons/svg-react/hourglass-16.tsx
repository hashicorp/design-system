import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHourglass16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M5.75 12.75A.75.75 0 016.5 12h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM7.75 4.5a.75.75 0 000 1.5h.5a.75.75 0 100-1.5h-.5z" />
                    <path
                        fillRule="evenodd"
                        d="M2.694 2.717A1.5 1.5 0 014.012.5h7.975a1.5 1.5 0 011.318 2.217L10.494 7.88a.25.25 0 000 .24l2.81 5.163a1.5 1.5 0 01-1.317 2.217H4.012a1.5 1.5 0 01-1.318-2.217L5.506 8.12a.25.25 0 000-.24L2.694 2.717zM11.987 2H4.012l2.811 5.163a1.75 1.75 0 010 1.674L4.012 14h7.975l-2.81-5.163a1.75 1.75 0 010-1.674L11.986 2z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
