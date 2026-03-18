import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDocs16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 1c.69 0 1.25.56 1.25 1.25v11.5c0 .69-.56 1.25-1.25 1.25h-8.5A2.25 2.25 0 0 1 2 12.75v-9.5A2.25 2.25 0 0 1 4.25 1zm-8.5 10.5a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75h8.25v-2zm0-9a.75.75 0 0 0-.75.75v6.878q.354-.126.75-.128h8.25V2.5z"
                />
            </svg>
        );
    }
);
