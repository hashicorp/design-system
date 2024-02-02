import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrantFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#1868F2">
                    <path
                        fillRule="evenodd"
                        d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm7.202 4.612l1.973-1.143 1.2.696v.809l-2.672 6.57L8 12.532l-1.703-.987-2.672-6.57v-.81l1.2-.695 1.973 1.143v.702L8 8.153l1.202-2.839v-.702z"
                        clipRule="evenodd"
                    />
                    <g opacity={0.3}>
                        <path d="M10.402 5.309l1.973-1.143v.808l-2.672 6.571L8 12.532V10.07l.8-.464 1.602-3.594v-.703zM6.798 4.612v.703L8 8.153v.989l-.8.464L5.597 6.01v-.703l1.2-.696z" />
                    </g>
                </g>
            </svg>
        );
    }
);
