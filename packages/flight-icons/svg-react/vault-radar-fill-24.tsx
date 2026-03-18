import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultRadarFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm16.328 11.325.672.673-.002.002c0 3.86-3.14 7-7 7C8.14 19 5 15.86 5 12s3.14-7 6.999-7c2.086 0 4.076.946 5.4 2.549L12.95 12H12v-.95l1.396-1.397A2.7 2.7 0 0 0 12 9.268 2.736 2.736 0 0 0 9.267 12a2.736 2.736 0 0 0 2.732 2.732A2.736 2.736 0 0 0 14.73 12l.672-.672.672.672A4.08 4.08 0 0 1 12 16.077 4.08 4.08 0 0 1 7.922 12 4.08 4.08 0 0 1 12 7.923c.863 0 1.68.269 2.367.76l1.127-1.128A5.67 5.67 0 0 0 12 6.343a5.66 5.66 0 0 0-5.654 5.655A5.66 5.66 0 0 0 12 17.653a5.66 5.66 0 0 0 5.654-5.655z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
