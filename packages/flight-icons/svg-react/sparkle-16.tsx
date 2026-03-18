import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSparkle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.697 5.365a.5.5 0 0 1 .92 0L7.774 8.07a.5.5 0 0 0 .263.262l2.703 1.16a.5.5 0 0 1 0 .918l-2.703 1.16a.5.5 0 0 0-.263.261l-1.159 2.704a.5.5 0 0 1-.919 0L4.54 11.83a.5.5 0 0 0-.263-.261l-2.704-1.16a.5.5 0 0 1 0-.919l2.704-1.159a.5.5 0 0 0 .263-.262zm6.13-3.329a.5.5 0 0 1 .918 0l.523 1.22a.5.5 0 0 0 .262.262l1.22.522a.5.5 0 0 1 0 .92l-1.22.522a.5.5 0 0 0-.262.262l-.523 1.22a.5.5 0 0 1-.919 0l-.522-1.22a.5.5 0 0 0-.263-.262l-1.219-.523a.5.5 0 0 1 0-.919l1.22-.522a.5.5 0 0 0 .262-.263z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
