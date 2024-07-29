import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwilioColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#F22F46"
                    d="M8 1c3.864 0 7 3.136 7 7s-3.136 7-7 7-7-3.136-7-7 3.136-7 7-7zm0 1.848A5.138 5.138 0 002.848 8 5.138 5.138 0 008 13.152 5.138 5.138 0 0013.152 8 5.138 5.138 0 008 2.848zM9.736 8.28a1.456 1.456 0 110 2.912 1.456 1.456 0 010-2.912zm-3.472 0a1.456 1.456 0 110 2.912 1.456 1.456 0 010-2.912zm3.472-3.472a1.456 1.456 0 110 2.912 1.456 1.456 0 010-2.912zm-3.472 0a1.456 1.456 0 110 2.912 1.456 1.456 0 010-2.912z"
                />
            </svg>
        );
    }
);
