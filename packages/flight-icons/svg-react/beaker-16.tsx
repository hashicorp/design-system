import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBeaker16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M12.25 2a.75.75 0 0 1 0 1.5h-.393l-.988 2.153a.25.25 0 0 0-.002.205l2.95 6.686A1.75 1.75 0 0 1 12.216 15H3.784a1.75 1.75 0 0 1-1.601-2.456l2.949-6.686a.25.25 0 0 0 0-.205L4.143 3.5H3.75a.751.751 0 0 1 0-1.5zM3.556 13.15a.25.25 0 0 0 .228.35h8.432a.25.25 0 0 0 .229-.35l-1.61-3.65h-5.67zm2.938-8.122c.209.455.213.978.011 1.436L5.827 8h4.346l-.678-1.536a1.75 1.75 0 0 1 .01-1.436l.701-1.528H5.794z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
