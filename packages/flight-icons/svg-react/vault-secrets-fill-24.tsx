import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecretsFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.196 16.083V19h1.608v-6.207H19v-1.586h-2.912c-.675 0-1.35.046-2.026.14l-.63.07.49-.397c.536-.42 1.048-.863 1.537-1.353l2.027-2.054-1.118-1.12-2.05 2.054a16.81 16.81 0 00-1.351 1.54l-.396.49.07-.63c.093-.677.14-1.354.14-2.03V5h-1.585v6.207H5v1.586h2.912c.675 0 1.35-.046 2.026-.14l.63-.07-.49.397c-.536.42-1.048.863-1.537 1.353l-2.05 2.054 1.118 1.12 2.05-2.054c.49-.49.932-1.003 1.351-1.54l.396-.49-.07.63a14.86 14.86 0 00-.14 2.03zm3.145-1.726v1.12l2.027 2.03 1.118-1.12-2.027-2.03h-1.118zm-7.85-6.744l2.026 2.03h1.119v-1.12l-2.027-2.03-1.118 1.12z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
