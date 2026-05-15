import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileChange16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.543 0c.331 0 .65.132.884.366l4.207 4.207c.234.235.366.553.366.884v8.293A2.25 2.25 0 0 1 12.75 16h-9.5A2.25 2.25 0 0 1 1 13.75V2.25A2.25 2.25 0 0 1 3.25 0zM3.25 1.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V6H9.75A.75.75 0 0 1 9 5.25V1.5zM6.875 8c.904 0 1.44.71 1.7 1.018.37.442.464.482.55.482.194 0 .374-.18.458-.344a.75.75 0 0 1 1.338.679 2.2 2.2 0 0 1-.422.57c-.27.27-.73.595-1.374.595-.904 0-1.44-.71-1.7-1.018-.37-.442-.464-.482-.55-.482-.2 0-.366.181-.458.344a.751.751 0 0 1-1.338-.679c.107-.212.254-.403.422-.57.27-.27.73-.595 1.374-.595M10.5 4.5h1.94L10.5 2.56z"
                />
            </svg>
        );
    }
);
