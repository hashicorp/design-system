import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCertificate16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 0A2.25 2.25 0 0 1 15 2.25v9.5A2.25 2.25 0 0 1 12.75 14h-1.67l.114.913a.7.7 0 0 1-.954.737L8 14.754l-2.24.896a.7.7 0 0 1-.954-.737L4.92 14H3.25A2.25 2.25 0 0 1 1 11.75v-9.5A2.25 2.25 0 0 1 3.25 0zM9.437 12.138c-.438.2-.924.312-1.437.312s-1-.112-1.437-.312l-.221 1.771 1.398-.56a.7.7 0 0 1 .52 0l1.398.56zM3.25 1.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h1.857l.172-1.378a3.45 3.45 0 1 1 5.441 0l.173 1.378h1.857a.75.75 0 0 0 .75-.75v-9.5a.75.75 0 0 0-.75-.75zM8 6.95a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1M9 2.5A.75.75 0 0 1 9 4H7a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
