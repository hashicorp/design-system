import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBox24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M13.206.754a2.75 2.75 0 00-2.412 0L1.983 5.052A1.75 1.75 0 001 6.625v9.902a2.75 2.75 0 001.496 2.448l8.25 4.226a2.75 2.75 0 002.508 0l8.25-4.226A2.75 2.75 0 0023 16.527V6.625a1.75 1.75 0 00-.983-1.573L13.206.754zm-1.754 1.348a1.25 1.25 0 011.096 0l8.11 3.956L12 10.17 3.343 6.058l8.109-3.956zM2.5 7.318v9.21c0 .468.263.898.68 1.112l8.07 4.133V11.474L2.5 7.318zm10.25 14.455l8.07-4.133a1.25 1.25 0 00.68-1.113v-9.21l-8.75 4.157v10.3z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
