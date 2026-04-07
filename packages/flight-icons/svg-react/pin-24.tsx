import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPin24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.615 3.483a1.753 1.753 0 0 1 2.464.011l4.425 4.425c.68.683.681 1.793 0 2.476l-2.612 2.611a.76.76 0 0 1-.53.22h-1.634l-2.025 2.025-.275 2.48c-.145 1.293-1.623 2.003-2.713 1.219-.772-.558-1.768-1.31-2.572-2.027L4.28 20.785a.754.754 0 0 1-1.06 0 .75.75 0 0 1 0-1.061l3.861-3.861c-.716-.804-1.468-1.8-2.026-2.574-.786-1.09-.076-2.567 1.218-2.711l2.48-.276 1.963-1.964V6.643c0-.2.082-.395.225-.535zm1.404 1.072a.254.254 0 0 0-.353-.002l-2.449 2.405v1.69c0 .198-.08.39-.22.531l-2.369 2.37a.76.76 0 0 1-.447.214l-2.741.305c-.194.022-.257.219-.168.344.692.957 1.622 2.174 2.384 2.937.764.762 1.98 1.693 2.938 2.385a.22.22 0 0 0 .343-.168l.304-2.742a.76.76 0 0 1 .215-.448l2.43-2.43c.141-.14.333-.22.531-.22h1.634l2.393-2.393a.255.255 0 0 0 0-.353z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
