import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConsulColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#E03875">
                    <path d="M8.006 15A7 7 0 1112.74 2.85l-1.66 1.738a4.6 4.6 0 100 6.828l1.66 1.737A6.98 6.98 0 018.006 15zM13.639 11.499a.574.574 0 110-1.147.574.574 0 010 1.147z" />
                    <path d="M7.96 9.517a1.517 1.517 0 11-.012-3.034 1.517 1.517 0 01.013 3.034zM14.296 9.544a.573.573 0 110-1.147.573.573 0 010 1.147zM12.59 9.472a.574.574 0 110-1.148.574.574 0 010 1.148zM14.296 7.61a.573.573 0 110-1.146.573.573 0 010 1.146zM12.59 7.675a.574.574 0 110-1.148.574.574 0 010 1.148zM13.672 5.68a.574.574 0 11-.003-1.147.574.574 0 01.003 1.148z" />
                </g>
            </svg>
        );
    }
);
