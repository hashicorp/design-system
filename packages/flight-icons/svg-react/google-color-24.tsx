import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleColor24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    fill="#4285f4"
                    d="M21.804 12.23c0-.68-.055-1.363-.172-2.032H12.2v3.85H17.6a4.63 4.63 0 0 1-1.999 3.04v2.498h3.223c1.892-1.742 2.98-4.314 2.98-7.356"
                />
                <path
                    fill="#34a853"
                    d="M12.2 22c2.697 0 4.971-.886 6.628-2.414l-3.222-2.499c-.896.61-2.054.956-3.402.956-2.61 0-4.821-1.76-5.615-4.126H3.264v2.575A10 10 0 0 0 12.2 22"
                />
                <path
                    fill="#fbbc04"
                    d="M6.585 13.917a6 6 0 0 1 0-3.83V7.513H3.264a10 10 0 0 0 0 8.98z"
                />
                <path
                    fill="#ea4335"
                    d="M12.2 5.958a5.43 5.43 0 0 1 3.836 1.499l2.855-2.855A9.6 9.6 0 0 0 12.2 2.001a10 10 0 0 0-8.936 5.511l3.321 2.576c.79-2.37 3.006-4.13 5.615-4.13"
                />
            </svg>
        );
    }
);
