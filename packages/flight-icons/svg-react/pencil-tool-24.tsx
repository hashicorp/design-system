import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPencilTool24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.056 4.884a2.75 2.75 0 0 1 3.888 0l.172.17a2.755 2.755 0 0 1 0 3.89L10.11 17.95A4.8 4.8 0 0 1 8.516 19l-4.238 1.695a.752.752 0 0 1-.975-.976L5 15.485a4.8 4.8 0 0 1 1.05-1.595zM7.11 14.95c-.31.31-.555.683-.719 1.09l-1.044 2.614 2.612-1.045a3.3 3.3 0 0 0 1.09-.72L16.44 9.5 14.5 7.56zm10.774-9.005a1.25 1.25 0 0 0-1.768 0l-.556.555L17.5 8.44l.555-.555a1.255 1.255 0 0 0 0-1.768z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
