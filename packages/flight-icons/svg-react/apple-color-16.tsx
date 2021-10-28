import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAppleColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#000"
                    d="M10.167 3.242c.435-.523.742-1.24.742-1.958 0-.105-.008-.202-.03-.284-.704.03-1.55.47-2.06 1.069-.397.448-.771 1.173-.771 1.891 0 .112.022.217.03.254.044.008.12.015.187.015.636 0 1.43-.419 1.902-.987zm.495 1.144c-1.056 0-1.918.643-2.465.643-.591 0-1.355-.606-2.284-.606C4.168 4.423 2.4 5.866 2.4 8.58c0 1.697.652 3.49 1.46 4.642C4.558 14.193 5.165 15 6.04 15c.87 0 1.251-.575 2.33-.575 1.093 0 1.333.56 2.292.56.95 0 1.588-.867 2.18-1.727.673-.986.95-1.943.958-1.988-.052-.015-1.873-.755-1.873-2.833 0-1.794 1.431-2.6 1.514-2.66-.944-1.354-2.382-1.391-2.78-1.391z"
                />
            </svg>
        );
    }
);
