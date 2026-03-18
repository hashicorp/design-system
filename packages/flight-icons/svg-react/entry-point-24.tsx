import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEntryPoint24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 3a9 9 0 1 1-7.873 13.364.75.75 0 0 1 1.311-.728 7.5 7.5 0 1 0 0-7.271.75.75 0 0 1-1.311-.73A9 9 0 0 1 12 3m-1.795 4.235a.75.75 0 0 1 1.06-.03l4.5 4.25a.75.75 0 0 1 0 1.09l-4.5 4.25a.75.75 0 1 1-1.03-1.09l3.128-2.955H3.75a.75.75 0 0 1 0-1.5h9.613l-3.128-2.955a.75.75 0 0 1-.03-1.06"
                />
            </svg>
        );
    }
);
