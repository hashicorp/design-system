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
                <g fill={color}>
                    <path d="M9.822 4.04a.5.5 0 000 .92l1.219.522a.5.5 0 01.263.262l.522 1.22a.5.5 0 00.92 0l.521-1.22a.5.5 0 01.263-.262l1.219-.522a.5.5 0 000-.92l-1.219-.522a.5.5 0 01-.263-.262l-.522-1.22a.5.5 0 00-.919 0l-.522 1.22a.5.5 0 01-.263.262l-1.219.522zM1.572 9.49a.5.5 0 000 .92l2.704 1.158a.5.5 0 01.263.263l1.158 2.704a.5.5 0 00.92 0l1.158-2.704a.5.5 0 01.263-.263l2.703-1.158a.5.5 0 000-.92L8.038 8.332a.5.5 0 01-.263-.263L6.616 5.365a.5.5 0 00-.919 0L4.54 8.07a.5.5 0 01-.263.263L1.572 9.49z" />
                </g>
            </svg>
        );
    }
);
