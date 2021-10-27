import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSlashSquare24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    <path d="M14.1 6.874a.75.75 0 011.3.752l-5.5 9.5a.75.75 0 11-1.3-.752l5.5-9.5z" />
                    <path
                        fillRule="evenodd"
                        d="M4.75 2A2.75 2.75 0 002 4.75v14.5A2.75 2.75 0 004.75 22h14.5A2.75 2.75 0 0022 19.25V4.75A2.75 2.75 0 0019.25 2H4.75zM3.5 4.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v14.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V4.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
