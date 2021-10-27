import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSocket24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM14.01 11a1 1 0 100 2h.01a1 1 0 100-2h-.01z" />
                    <path
                        fillRule="evenodd"
                        d="M12 4a8 8 0 100 16 8 8 0 000-16zm-6.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M3.75 1A2.75 2.75 0 001 3.75v16.5A2.75 2.75 0 003.75 23h16.5A2.75 2.75 0 0023 20.25V3.75A2.75 2.75 0 0020.25 1H3.75zM2.5 3.75c0-.69.56-1.25 1.25-1.25h16.5c.69 0 1.25.56 1.25 1.25v16.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25V3.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
