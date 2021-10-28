import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconDiamondFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M10.056 1.924l-8.132 8.132a2.75 2.75 0 000 3.889l8.132 8.131a2.75 2.75 0 003.889 0l8.131-8.131a2.75 2.75 0 000-3.89l-8.131-8.13a2.75 2.75 0 00-3.89 0z"
                />
            </svg>
        );
    }
);
