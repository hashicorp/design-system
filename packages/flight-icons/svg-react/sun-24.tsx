import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSun24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 20.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75zm-6.89-2.42a.75.75 0 011.06 1.06l-1.42 1.42a.75.75 0 01-1.06-1.06l1.42-1.42zm12.72 0a.75.75 0 011.06 0l1.42 1.42a.75.75 0 01-1.06 1.06l-1.42-1.42a.751.751 0 010-1.06zM12 6a6 6 0 110 12 6 6 0 010-12zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm-9 3.75a.75.75 0 010 1.5H1a.75.75 0 010-1.5h2zm20 0a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h2zM3.69 3.69a.75.75 0 011.06 0l1.42 1.42a.75.75 0 11-1.06 1.06L3.69 4.752a.751.751 0 010-1.062zm15.56 0a.75.75 0 011.06 1.061l-1.42 1.42a.75.75 0 01-1.06-1.06l1.42-1.422zM12 .25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 0112 .25z"
                />
            </svg>
        );
    }
);
