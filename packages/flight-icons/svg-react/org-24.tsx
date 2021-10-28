import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconOrg24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M2 4.75A2.75 2.75 0 014.75 2h10.5A2.75 2.75 0 0118 4.75v5.504l2.326.988A2.75 2.75 0 0122 13.773v6.477A1.75 1.75 0 0120.25 22h-3a.746.746 0 01-.622-.33.746.746 0 01-.128-.42V10.769a.81.81 0 010-.039V4.75c0-.69-.56-1.25-1.25-1.25H4.75c-.69 0-1.25.56-1.25 1.25v16.5a.75.75 0 01-1.5 0V4.75zM18 20.5v-8.616l1.739.739c.461.196.76.649.76 1.15v6.477a.25.25 0 01-.25.25H18z"
                        clipRule="evenodd"
                    />
                    <path d="M8.25 16C7.56 16 7 16.56 7 17.25v4a.75.75 0 001.5 0V17.5h3v3.75a.75.75 0 001.5 0v-4c0-.69-.56-1.25-1.25-1.25h-3.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM11.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 9.75A.75.75 0 017.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 9.75zM11.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 12.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM11.75 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z" />
                </g>
            </svg>
        );
    }
);
