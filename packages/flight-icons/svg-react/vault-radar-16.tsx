import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultRadar16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15 7.998l-.672-.673-.673.673a5.662 5.662 0 01-5.654 5.655 5.662 5.662 0 01-5.654-5.655A5.662 5.662 0 018 2.343c1.275 0 2.506.439 3.492 1.212l-1.127 1.128a4.047 4.047 0 00-2.367-.76A4.081 4.081 0 003.922 8 4.081 4.081 0 008 12.077 4.081 4.081 0 0012.075 8l-.672-.672-.672.672a2.736 2.736 0 01-2.732 2.732A2.736 2.736 0 015.267 8a2.736 2.736 0 012.732-2.732c.5 0 .977.136 1.396.385L8 7.05V8h.95l4.45-4.451A7.032 7.032 0 008 1C4.139 1 1 4.14 1 8s3.14 7 6.999 7c3.859 0 6.999-3.14 6.999-7L15 7.998z"
                />
            </svg>
        );
    }
);
