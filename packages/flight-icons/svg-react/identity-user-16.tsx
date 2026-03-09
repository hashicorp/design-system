import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIdentityUser16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 0C11.44 0 12 .56 12 1.25V2h1.75A2.25 2.25 0 0116 4.25v8.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-8.5A2.25 2.25 0 012.25 2H4v-.75C4 .56 4.56 0 5.25 0h5.5zm-8.5 3.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-8.5a.75.75 0 00-.75-.75h-2c-.228.304-.591.5-1 .5h-5.5c-.409 0-.772-.196-1-.5h-2zM9.375 10c.515 0 1.034.161 1.438.482.41.325.687.807.687 1.359v.409a.75.75 0 01-1.5 0v-.41c0-.026-.013-.098-.12-.183a.828.828 0 00-.505-.157h-2.75a.828.828 0 00-.506.157c-.106.085-.119.157-.119.184v.409a.75.75 0 01-1.5 0v-.41c0-.55.277-1.033.687-1.358A2.324 2.324 0 016.625 10h2.75zM8 4.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM8 6a1 1 0 100 2 1 1 0 000-2zM5.5 2.5h5v-1h-5v1z"
                />
            </svg>
        );
    }
);
