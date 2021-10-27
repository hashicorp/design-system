import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconRedirect24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 5.786c0-1.046 1.209-1.63 2.028-.978l7.45 5.922c.627.498.63 1.45.005 1.952l-7.45 5.997c-.817.659-2.033.077-2.033-.973v-2.754a7.316 7.316 0 00-2.824.427c-1.306.456-2.918 1.342-5.295 2.981-.436.3-.973.287-1.37.029a1.168 1.168 0 01-.479-1.326c.591-2 1.91-4.124 3.743-5.755C7.444 9.824 9.571 8.72 12 8.529V5.786zm1.5.518V9.25a.75.75 0 01-.75.75c-2.296 0-4.35.98-5.978 2.428-1.36 1.21-2.393 2.723-2.994 4.189 2.031-1.357 3.565-2.187 4.903-2.654 1.53-.535 2.769-.584 4.137-.46a.75.75 0 01.682.747v2.933l6.8-5.473-6.8-5.406z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
