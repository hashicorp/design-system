import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBeaker24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 4a.75.75 0 0 1 0 1.5h-.662l-1.441 2.884a.25.25 0 0 0 0 .225l4.657 9.118C20.57 19.224 19.481 21 17.8 21H6.2c-1.68 0-2.768-1.776-2.003-3.273l4.655-9.118a.25.25 0 0 0 0-.225L7.413 5.5H6.75a.75.75 0 0 1 0-1.5zM5.533 18.41A.75.75 0 0 0 6.2 19.5h11.6a.75.75 0 0 0 .667-1.09l-2.507-4.91H8.04zm4.662-10.697a1.75 1.75 0 0 1-.007 1.578L8.805 12h6.39l-1.383-2.709a1.75 1.75 0 0 1-.007-1.578L14.912 5.5H9.088z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
