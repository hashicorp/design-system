import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEdit24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11 3a.75.75 0 0 1 0 1.5H3.75c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V13a.75.75 0 0 1 1.5 0v7.25A2.75 2.75 0 0 1 18.25 23H3.75A2.75 2.75 0 0 1 1 20.25V5.75A2.75 2.75 0 0 1 3.75 3zm6.056-.116a2.75 2.75 0 0 1 3.888 0l.172.171a2.75 2.75 0 0 1 0 3.89l-9.005 9.005A4.8 4.8 0 0 1 10.517 17l-4.239 1.696a.75.75 0 0 1-.808-.166.75.75 0 0 1-.166-.81l1.695-4.237a4.8 4.8 0 0 1 1.05-1.595zM9.11 12.95c-.31.31-.556.682-.72 1.09l-1.044 2.614 2.612-1.045c.408-.164.78-.41 1.09-.72L18.44 7.5 16.5 5.561zm10.773-9.005a1.25 1.25 0 0 0-1.768 0l-.555.555L19.5 6.44l.556-.555a1.25 1.25 0 0 0 0-1.768z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
