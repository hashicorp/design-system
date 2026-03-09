import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDelete16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.749 2a2.252 2.252 0 012.25 2.25v7.5a2.252 2.252 0 01-2.25 2.25h-8.03c-.508 0-.995-.224-1.327-.61L.18 8.49a.753.753 0 010-.98l4.21-4.9c.333-.386.82-.61 1.329-.61h8.029zm-8.03 1.5a.258.258 0 00-.19.087L1.74 8l3.79 4.413a.258.258 0 00.19.087h8.03a.753.753 0 00.75-.75v-7.5a.752.752 0 00-.75-.75h-8.03zm5 1.72a.752.752 0 011.06 0c.291.292.291.768 0 1.06L10.06 8l1.72 1.72c.291.292.291.768 0 1.06a.752.752 0 01-1.06 0l-1.72-1.72-1.72 1.72a.752.752 0 01-1.06 0 .751.751 0 010-1.06L7.939 8l-1.72-1.72a.751.751 0 010-1.06.752.752 0 011.06 0L9 6.94l1.72-1.72z"
                />
            </svg>
        );
    }
);
