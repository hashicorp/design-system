import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconOktaColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill="#007DC1"
                    d="M8 1C4.143 1 1 4.12 1 8s3.121 7 7 7 7-3.121 7-7-3.143-7-7-7zm0 10.5c-1.94 0-3.5-1.56-3.5-3.5S6.06 4.5 8 4.5s3.5 1.56 3.5 3.5-1.56 3.5-3.5 3.5z"
                />
            </svg>
        );
    }
);
