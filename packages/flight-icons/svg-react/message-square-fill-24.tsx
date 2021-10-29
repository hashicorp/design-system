import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMessageSquareFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6 6.75A.75.75 0 016.75 6h10a.75.75 0 010 1.5h-10A.75.75 0 016 6.75zM6 9.75A.75.75 0 016.75 9h5a.75.75 0 010 1.5h-5A.75.75 0 016 9.75zM6 12.75a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M19.25 2A2.75 2.75 0 0122 4.75v10.5A2.75 2.75 0 0119.25 18H8.26a1.25 1.25 0 00-.801.291L3.23 21.825A.75.75 0 012 21.25V4.75A2.75 2.75 0 014.75 2h14.5zm1.25 2.75c0-.69-.56-1.25-1.25-1.25H4.75c-.69 0-1.25.56-1.25 1.25v14.895l2.997-2.505a2.75 2.75 0 011.763-.64h10.99c.69 0 1.25-.56 1.25-1.25V4.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
