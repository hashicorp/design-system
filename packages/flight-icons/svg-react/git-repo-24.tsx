import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGitRepo24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M5.75 1A2.75 2.75 0 003 3.75v14.5A2.75 2.75 0 005.75 21H6a.75.75 0 000-1.5h-.25c-.69 0-1.25-.56-1.25-1.25v-1c0-.69.56-1.25 1.25-1.25H19.5v3.25a.25.25 0 01-.25.25H16a.75.75 0 000 1.5h3.25A1.75 1.75 0 0021 19.25V2.75A1.75 1.75 0 0019.25 1H5.75zM19.5 14.5V2.75a.25.25 0 00-.25-.25H5.75c-.69 0-1.25.56-1.25 1.25V14.8c.375-.192.8-.3 1.25-.3H19.5z"
                        clipRule="evenodd"
                    />
                    <path d="M8.75 18a.75.75 0 00-.75.75v3.5a.75.75 0 001.128.648L11 21.806l1.872 1.092A.75.75 0 0014 22.25v-3.5a.75.75 0 00-.75-.75h-4.5z" />
                </g>
            </svg>
        );
    }
);
