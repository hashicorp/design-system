import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGoogleColor16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    fill="#4285F4"
                    d="M14.9 8.161c0-.476-.039-.954-.122-1.422H8.14v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.268c1.332-1.22 2.098-3.02 2.098-5.15z"
                />
                <path
                    fill="#34A853"
                    d="M8.14 15c1.897 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.837 0-3.394-1.232-3.952-2.888H1.849v1.803A7.044 7.044 0 008.139 15z"
                />
                <path
                    fill="#FBBC04"
                    d="M4.187 9.341a4.17 4.17 0 010-2.68V4.858H1.849a6.97 6.97 0 000 6.287l2.338-1.803z"
                />
                <path
                    fill="#EA4335"
                    d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.291 3.858L4.187 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
                />
            </svg>
        );
    }
);
