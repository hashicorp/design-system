import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFacebook24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M23 12c0-6.076-4.924-11-11-11S1 5.924 1 12c0 5.491 4.022 10.042 9.281 10.867V15.18H7.488V12h2.793V9.577c0-2.757 1.642-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.367 0-1.792.848-1.792 1.719V12h3.05l-.487 3.18h-2.563v7.687C18.979 22.042 23 17.49 23 12z"
                />
            </svg>
        );
    }
);
