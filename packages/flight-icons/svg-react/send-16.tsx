import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSend16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.08 2.526c.368-1.001-.605-1.974-1.606-1.605L1.878 5.193a1.25 1.25 0 00-.295 2.19l4.07 2.907a.25.25 0 01.057.058l2.907 4.069a1.25 1.25 0 002.19-.295l4.272-11.596zM2.84 6.437l10.645-3.922L9.563 13.16 7.174 9.816l3.071-3.071a.7.7 0 10-.99-.99L6.184 8.826 2.84 6.437z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
