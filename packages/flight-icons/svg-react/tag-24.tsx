import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTag24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path d="M6 5a1 1 0 000 2h.01a1 1 0 000-2H6z" />
                    <path
                        fillRule="evenodd"
                        d="M4.75 2A2.75 2.75 0 002 4.75v6.422c0 .729.29 1.428.805 1.944l8 8a2.75 2.75 0 003.89 0l6.421-6.421a2.75 2.75 0 000-3.89l-8-8A2.75 2.75 0 0011.172 2H4.75zM3.5 4.75c0-.69.56-1.25 1.25-1.25h6.422c.331 0 .649.132.883.366l8 8a1.25 1.25 0 010 1.768l-6.421 6.421a1.25 1.25 0 01-1.768 0l-8-8a1.25 1.25 0 01-.366-.883V4.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
