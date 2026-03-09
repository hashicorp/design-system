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
                    d="M11 3a.75.75 0 010 1.5H3.75c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V13a.75.75 0 011.5 0v7.25A2.751 2.751 0 0118.25 23H3.75A2.751 2.751 0 011 20.25V5.75A2.75 2.75 0 013.75 3H11zm6.056-.116a2.75 2.75 0 013.888 0l.172.171a2.751 2.751 0 010 3.89l-9.005 9.005A4.757 4.757 0 0110.517 17l-4.239 1.696a.752.752 0 01-.808-.166.753.753 0 01-.166-.81l1.695-4.237a4.755 4.755 0 011.05-1.595l9.007-9.005zM9.11 12.95c-.31.31-.556.682-.72 1.09l-1.044 2.614 2.612-1.045c.408-.164.78-.41 1.09-.72L18.44 7.5 16.5 5.561 9.111 12.95zm10.773-9.005a1.25 1.25 0 00-1.768 0l-.555.555L19.5 6.44l.556-.555a1.252 1.252 0 000-1.768l-.172-.171z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
