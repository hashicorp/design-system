import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAnsibleCommunity16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.15 13.8L9 1.5c-.15-.35-.45-.55-.8-.55-.35 0-.65.2-.8.55L1.75 14.95H3.7L5.95 9.4l6.65 5.35c.25.2.45.3.7.3.5 0 .95-.35.95-.9 0-.1-.05-.2-.1-.35zM8.2 3.7l3.35 8.2L6.5 7.95 8.2 3.7z"
                />
            </svg>
        );
    }
);
