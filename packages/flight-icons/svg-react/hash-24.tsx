import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHash24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.362 3.009a.75.75 0 01.63.853L10.363 8h4.484l.66-4.362a.75.75 0 111.483.224L16.364 8h2.886a.75.75 0 010 1.5h-3.112l-.682 4.5h3.794a.75.75 0 010 1.5h-4.021l-.738 4.862a.75.75 0 01-1.482-.225l.702-4.637H9.229l-.738 4.862a.75.75 0 01-1.482-.225L7.71 15.5H4.75a.75.75 0 010-1.5h3.188l.682-4.5H4.75a.75.75 0 110-1.5h4.098l.66-4.362a.75.75 0 01.854-.63zM9.456 14h4.482l.682-4.5h-4.482L9.456 14z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
