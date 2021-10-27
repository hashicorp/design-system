import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCheckDiamondFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M13.945 1.884a2.75 2.75 0 00-3.89 0l-8.171 8.172a2.75 2.75 0 000 3.889l8.171 8.171a2.75 2.75 0 003.89 0l8.171-8.171a2.75 2.75 0 000-3.89l-8.171-8.17zM16.28 9.78l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.97 1.97 4.97-4.97a.75.75 0 011.06 1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
