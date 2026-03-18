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
                <g fill="#e03875">
                    <path d="M8.006 15A7 7 0 1 1 12.74 2.85l-1.66 1.738a4.6 4.6 0 1 0 0 6.828l1.66 1.737A6.98 6.98 0 0 1 8.006 15M13.639 11.499a.574.574 0 1 1 0-1.147.574.574 0 0 1 0 1.147" />
                    <path d="M7.96 9.517a1.517 1.517 0 1 1-.012-3.034 1.517 1.517 0 0 1 .013 3.034M14.297 9.544a.573.573 0 1 1 0-1.147.573.573 0 0 1 0 1.147M12.59 9.472a.574.574 0 1 1 0-1.148.574.574 0 0 1 0 1.148M14.297 7.61a.573.573 0 1 1 0-1.146.573.573 0 0 1 0 1.146M12.59 7.675a.574.574 0 1 1 0-1.148.574.574 0 0 1 0 1.148M13.672 5.68a.574.574 0 1 1-.003-1.147.574.574 0 0 1 .003 1.148" />
                </g>
            </svg>
        );
    }
);
