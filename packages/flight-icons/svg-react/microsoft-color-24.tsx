import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMicrosoftColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#F35325" d="M3 3h8.5v8.5H3V3z" />
                <path fill="#81BC06" d="M12.5 3H21v8.5h-8.5V3z" />
                <path fill="#05A6F0" d="M3 12.5h8.5V21H3v-8.5z" />
                <path fill="#FFBA08" d="M12.5 12.5H21V21h-8.5v-8.5z" />
            </svg>
        );
    }
);
