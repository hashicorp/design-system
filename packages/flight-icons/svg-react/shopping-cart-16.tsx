import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconShoppingCart16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M1.25 1.5a.75.75 0 000 1.5h1.154a.75.75 0 01.736.604l.874 4.413.405 2.15A2.25 2.25 0 006.63 12h6.095a2.25 2.25 0 002.214-1.848l.727-4A2.25 2.25 0 0013.453 3.5H4.648l-.037-.187A2.25 2.25 0 002.404 1.5H1.25zm4.237 6.236L4.945 5h8.508a.75.75 0 01.738.884l-.728 4a.75.75 0 01-.738.616H6.63a.75.75 0 01-.737-.611l-.406-2.153z"
                        clipRule="evenodd"
                    />
                    <path d="M7.5 13.75c0 .69-.56 1.25-1.25 1.25h-.01a1.25 1.25 0 110-2.5h.01c.69 0 1.25.56 1.25 1.25zM14 13.75c0 .69-.56 1.25-1.25 1.25h-.01a1.25 1.25 0 110-2.5h.01c.69 0 1.25.56 1.25 1.25z" />
                </g>
            </svg>
        );
    }
);
