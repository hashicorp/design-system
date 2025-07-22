import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoveHorizontal24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M12 2a.75.75 0 01.75.75v18.5a.75.75 0 01-1.5 0V2.75A.75.75 0 0112 2zM5.033 8.668A.75.75 0 016.037 9.78l-1.47 1.47H9.5a.75.75 0 010 1.5H4.567l1.47 1.47a.75.75 0 01-1.06 1.06l-2.75-2.75a.75.75 0 010-1.06l2.75-2.75.056-.052zM17.977 8.727a.75.75 0 011.06 0l2.743 2.743a.75.75 0 010 1.06l-2.743 2.743-.057.051a.75.75 0 01-1.054-1.054l.05-.057 1.463-1.463H14.5a.75.75 0 010-1.5h4.94l-1.462-1.463a.75.75 0 010-1.06z" />
                </g>
            </svg>
        );
    }
);
