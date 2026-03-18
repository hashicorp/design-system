import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBox24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.794.754a2.75 2.75 0 0 1 2.412 0l8.812 4.298c.6.293.982.904.982 1.573v9.902a2.75 2.75 0 0 1-1.496 2.448l-8.25 4.225a2.75 2.75 0 0 1-2.508 0l-8.25-4.225A2.75 2.75 0 0 1 1 16.527V6.625c0-.669.381-1.28.982-1.573zM2.5 16.527c0 .47.263.899.68 1.113l8.07 4.133v-10.3L2.5 7.318zm10.25-5.052v10.298l8.07-4.133a1.25 1.25 0 0 0 .68-1.113V7.318zm-.202-9.373a1.25 1.25 0 0 0-1.096 0l-8.11 3.956L12 10.17l8.657-4.112z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
