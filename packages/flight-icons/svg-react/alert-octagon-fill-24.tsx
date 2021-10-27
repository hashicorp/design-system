import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAlertOctagonFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M8.585 1c-.73 0-1.429.29-1.945.805L1.805 6.64A2.75 2.75 0 001 8.585v6.83c0 .73.29 1.429.805 1.945l4.835 4.835A2.75 2.75 0 008.585 23h6.83c.73 0 1.429-.29 1.945-.805l4.835-4.835A2.75 2.75 0 0023 15.415v-6.83c0-.73-.29-1.429-.805-1.945L17.36 1.805A2.75 2.75 0 0015.415 1h-6.83zm2.665 6.75a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zM11 16a1 1 0 011-1h.01a1 1 0 110 2H12a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
