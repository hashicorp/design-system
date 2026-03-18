import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconResizeColumn16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.47 9.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.112-1.004l.052-.056.97-.97H3.56l.97.97a.75.75 0 0 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25.057-.052A.75.75 0 0 1 4.53 10.28l-.97.97h8.88l-.97-.97a.75.75 0 0 1 0-1.06M12.75 1C14.192 1 15 2.22 15 3.25v4a.75.75 0 0 1-.75.75H1.75A.75.75 0 0 1 1 7.25v-4C1 2.22 1.788 1 3.25 1zm-9.5 1.5a.74.74 0 0 0-.75.75V6.5h11V3.25a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
