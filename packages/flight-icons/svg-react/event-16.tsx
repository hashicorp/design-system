import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEvent16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    d="M11.25 0a.75.75 0 01.75.75V1h1.75A2.25 2.25 0 0116 3.25v10.5A2.25 2.25 0 0113.75 16H2.25A2.25 2.25 0 010 13.75V3.25A2.25 2.25 0 012.25 1H4V.75a.75.75 0 011.5 0V1h5V.75a.75.75 0 01.75-.75zm-9 2.5a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V3.25a.75.75 0 00-.75-.75H12v.75a.75.75 0 01-1.5 0V2.5h-5v.75a.75.75 0 01-1.5 0V2.5H2.25zM8 3.75a.75.75 0 01.675.424l1.14 2.358 2.545.38a.752.752 0 01.418 1.274l-1.85 1.838.438 2.602a.75.75 0 01-1.095.785L8 12.191l-2.271 1.22a.75.75 0 01-1.095-.785l.437-2.602-1.85-1.838A.75.75 0 013.64 6.91l2.545-.379 1.14-2.358A.75.75 0 018 3.75zm-.638 3.792a.75.75 0 01-.564.415l-1.46.218 1.065 1.058a.75.75 0 01.211.657l-.248 1.476 1.28-.686a.75.75 0 01.708 0l1.28.686-.248-1.476a.75.75 0 01.21-.657l1.066-1.058-1.46-.218a.75.75 0 01-.564-.415L8 6.222l-.638 1.32z"
                />
            </svg>
        );
    }
);
