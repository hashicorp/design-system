import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSparkle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.087 13.226a.5.5 0 01.919 0l.84 1.96a.5.5 0 00.264.263l1.96.841a.5.5 0 010 .92l-1.96.84a.5.5 0 00-.263.263l-.841 1.96a.5.5 0 01-.919 0l-.84-1.96a.5.5 0 00-.264-.263l-1.96-.84a.5.5 0 010-.92l1.96-.84a.501.501 0 00.263-.263l.841-1.961zM8.111 6.75a.5.5 0 01.92 0l1.583 3.693a.5.5 0 00.263.263l3.693 1.583a.5.5 0 010 .92l-3.693 1.582a.501.501 0 00-.263.263l-1.583 3.693a.5.5 0 01-.92 0l-1.583-3.693a.5.5 0 00-.261-.263L2.572 13.21a.5.5 0 010-.919l3.695-1.583a.5.5 0 00.261-.263l1.583-3.693zm7.465-2.965a.5.5 0 01.92 0l.522 1.22a.5.5 0 00.262.262l1.22.522a.5.5 0 010 .92l-1.22.522a.501.501 0 00-.262.262l-.523 1.22a.5.5 0 01-.919 0l-.522-1.22a.5.5 0 00-.263-.262l-1.219-.523a.5.5 0 010-.919l1.22-.522a.501.501 0 00.262-.263l.522-1.219z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
