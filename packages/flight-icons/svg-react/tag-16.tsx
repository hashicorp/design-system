import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTag16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M5 4a1 1 0 000 2h.006a1 1 0 000-2H5z" />
                    <path
                        fillRule="evenodd"
                        d="M2.25 1C1.56 1 1 1.56 1 2.25v5.246c0 .596.237 1.169.659 1.59l5.383 5.384a2.25 2.25 0 003.182 0l4.246-4.246a2.25 2.25 0 000-3.182L9.087 1.66A2.25 2.25 0 007.496 1H2.25zm.25 6.496V2.5h4.996a.75.75 0 01.53.22l5.383 5.383a.75.75 0 010 1.06L9.163 13.41a.75.75 0 01-1.06 0L2.72 8.026a.75.75 0 01-.22-.53z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
