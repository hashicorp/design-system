import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDatastaxColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#000" d="M15 1H1v14h14V1z" />
                <g fill="#fff">
                    <path d="M9.265 7.7v-.2h-.958l-.26.2v.276l.26.2h.835v.283H8.099v.201h.983l.26-.2v-.283l-.26-.2h-.834V7.7h1.017zM4.252 7.5h-.183L3.4 8.66h.232l.53-.917.53.917h.231l-.67-1.16zM6.244 7.5H4.949v.2h.547v.96h.2V7.7h.548v-.2zM10.96 7.5H9.664v.2h.548v.96h.2V7.7h.547v-.2zM2.885 7.5H1.85v1.16h1.035l.26-.2V7.7l-.26-.2zm-.834.96V7.7h.894v.76H2.05zM13.329 8.08l-.336-.58h-.231l.335.58-.335.58h.231l.335-.58zM13.658 8.08l.335-.58h.232l-.335.58.335.58h-.232l-.335-.58zM6.94 7.5h.183l.67 1.16h-.231l-.53-.917-.53.917H6.27l.67-1.16zM11.656 7.5h.183l.67 1.16h-.232l-.53-.917-.53.917h-.231l.67-1.16z" />
                </g>
            </svg>
        );
    }
);
