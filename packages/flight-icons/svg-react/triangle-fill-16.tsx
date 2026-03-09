import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTriangleFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1.25a2.103 2.103 0 011.785.996l.002.004 5.682 9.383a2.068 2.068 0 01-.752 2.832c-.314.183-.671.281-1.034.285H2.317a2.102 2.102 0 01-1.79-1.045 2.066 2.066 0 01.005-2.071l.006-.011L6.213 2.25l.641.389-.64-.393A2.103 2.103 0 018 1.25z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
