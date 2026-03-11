import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBellActive16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.103 12.872a.75.75 0 011.295.756A2.774 2.774 0 018 15a2.773 2.773 0 01-2.397-1.372.75.75 0 011.294-.756c.22.375.63.628 1.103.628s.883-.253 1.103-.628zM8 1c.2 0 .395.01.587.033a.75.75 0 01-.174 1.49A3.578 3.578 0 008 2.5c-2.062 0-3.5 1.776-3.5 3.905V8.78c0 .677-.145 1.252-.387 1.72h7.774c-.242-.468-.387-1.043-.387-1.72V6.781a.75.75 0 011.5 0v2c0 1.333.788 1.719 1.25 1.719a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5c.462 0 1.25-.386 1.25-1.72V6.405C3 3.665 4.907 1 8 1zm4 0a2 2 0 110 4 2 2 0 010-4z"
                />
            </svg>
        );
    }
);
