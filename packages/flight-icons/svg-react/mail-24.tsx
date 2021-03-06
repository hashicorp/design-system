import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMail24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M1 5.75A2.75 2.75 0 013.75 3h16.5A2.75 2.75 0 0123 5.75v12.5A2.75 2.75 0 0120.25 21H3.75A2.75 2.75 0 011 18.25V5.75zM3.75 4.5a1.25 1.25 0 00-1.057.582L12 12.062l9.307-6.98A1.25 1.25 0 0020.25 4.5H3.75zM2.5 16.44V6.812l5.501 4.125L2.5 16.44zm.031 2.09c.127.555.625.97 1.219.97h16.5a1.25 1.25 0 001.219-.97l-6.682-6.683L12.45 13.6a.75.75 0 01-.9 0l-2.337-1.752-6.682 6.681zM16 10.937L21.5 16.44V6.813l-5.501 4.125z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
