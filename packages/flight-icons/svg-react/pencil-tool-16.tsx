import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPencilTool16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.51 2.177a1.75 1.75 0 0 1 2.474 0l.836.836a1.753 1.753 0 0 1 0 2.475l-7.253 7.253c-.262.262-.578.47-.922.608l-3.37 1.348a.76.76 0 0 1-.808-.166.75.75 0 0 1-.166-.809l1.347-3.369c.139-.345.346-.66.609-.924zm-6.193 8.314c-.118.12-.213.263-.276.419l-.697 1.744 1.743-.697c.156-.063.3-.159.42-.278l5.555-5.553-1.19-1.19zm7.607-7.253a.25.25 0 0 0-.354 0l-.637.638 1.19 1.19.637-.639a.253.253 0 0 0 0-.353z"
                />
            </svg>
        );
    }
);
