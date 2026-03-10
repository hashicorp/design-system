import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackage24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.794.754a2.752 2.752 0 012.412 0l8.812 4.298c.6.293.982.904.982 1.573v9.902a2.75 2.75 0 01-1.496 2.448l-8.25 4.225a2.75 2.75 0 01-2.508 0l-8.25-4.225A2.75 2.75 0 011 16.527V6.625c0-.669.381-1.28.982-1.573L10.794.754zM2.5 16.527c0 .47.262.899.68 1.113l8.07 4.133v-10.3L2.5 7.318v9.21zm10.25-5.053v10.3l8.07-4.134a1.25 1.25 0 00.68-1.113v-9.21l-8.75 4.157zM3.343 6.058L12 10.17l3.417-1.623-8.482-4.241-3.592 1.752zm9.205-3.956a1.25 1.25 0 00-1.096 0l-2.82 1.376 8.505 4.252 3.52-1.672-8.11-3.956z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
