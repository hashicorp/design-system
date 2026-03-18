import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIdentityService16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 0C11.44 0 12 .56 12 1.25V2h1.75A2.25 2.25 0 0 1 16 4.25v8.5A2.25 2.25 0 0 1 13.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-8.5A2.25 2.25 0 0 1 2.25 2H4v-.75C4 .56 4.56 0 5.25 0zm-8.5 3.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75v-8.5a.75.75 0 0 0-.75-.75h-2c-.228.304-.591.5-1 .5h-5.5c-.409 0-.772-.196-1-.5zM8 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8M5.55 9.5c.202.998 1 1.78 2.006 1.96a6 6 0 0 1-.529-1.96zm2.987 0c.08.633.286 1.227.594 1.73a2.5 2.5 0 0 0 1.32-1.73zm-.981-2.96c-.83.148-1.52.708-1.848 1.46h1.388a6 6 0 0 1 .46-1.46m1.575.23A4.3 4.3 0 0 0 8.628 8h1.664a2.5 2.5 0 0 0-1.161-1.23M5.5 2.5h5v-1h-5z"
                />
            </svg>
        );
    }
);
