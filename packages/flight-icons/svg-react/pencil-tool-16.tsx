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
                    d="M10.511 2.177a1.75 1.75 0 0 1 2.475 0l.836.836c.68.684.681 1.792 0 2.475L6.569 12.74c-.263.262-.579.47-.923.608l-3.37 1.348a.76.76 0 0 1-.808-.166.75.75 0 0 1-.166-.809l1.348-3.369a2.8 2.8 0 0 1 .608-.924zM4.32 10.491q-.181.182-.277.419l-.697 1.744 1.743-.697c.156-.063.301-.159.42-.278l5.555-5.553-1.19-1.19zm7.606-7.253a.25.25 0 0 0-.353 0l-.638.638 1.19 1.189.637-.638a.254.254 0 0 0 0-.353z"
                />
            </svg>
        );
    }
);
