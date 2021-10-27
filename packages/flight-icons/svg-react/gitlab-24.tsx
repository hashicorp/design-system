import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGitlab24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.963 13.292l-1.12-3.363-2.217-6.673a.383.383 0 00-.363-.255.383.383 0 00-.364.255l-2.217 6.669H8.316L6.1 3.256A.382.382 0 005.736 3a.382.382 0 00-.363.256L3.16 9.925l-1.12 3.367a.736.736 0 00.275.833L12 21l9.683-6.875a.737.737 0 00.28-.833z"
                />
            </svg>
        );
    }
);
