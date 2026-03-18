import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLink24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.64 8.33a5.49 5.49 0 0 1 3.991 2.174.75.75 0 0 1-.15 1.052.754.754 0 0 1-1.05-.15 4 4 0 0 0-2.898-1.579 4 4 0 0 0-1.672.24c-.532.199-1.021.51-1.422.91l-2.828 2.82a3.96 3.96 0 0 0-1.11 2.779A3.964 3.964 0 0 0 7.438 20.5a4 4 0 0 0 2.79-1.108l1.61-1.605a.75.75 0 1 1 1.059 1.063l-1.624 1.619a5.5 5.5 0 0 1-3.849 1.53A5.464 5.464 0 0 1 2 16.59a5.46 5.46 0 0 1 1.537-3.84l.01-.009L6.38 9.916A5.5 5.5 0 0 1 8.337 8.66a5.5 5.5 0 0 1 2.303-.33M16.575 2a5.5 5.5 0 0 1 3.822 1.598 5.451 5.451 0 0 1 .066 7.652l-.009.01-2.833 2.825a5.5 5.5 0 0 1-1.958 1.255 5.5 5.5 0 0 1-2.302.329 5.5 5.5 0 0 1-2.233-.654 5.5 5.5 0 0 1-1.758-1.52.76.76 0 0 1 .15-1.05.754.754 0 0 1 1.05.15c.34.453.778.831 1.276 1.103a4 4 0 0 0 1.622.475 3.993 3.993 0 0 0 3.094-1.15l2.829-2.82a3.95 3.95 0 0 0-.053-5.543 4 4 0 0 0-2.775-1.16 4 4 0 0 0-2.791 1.108L12.15 6.215a.753.753 0 0 1-1.061-.005.76.76 0 0 1 .005-1.06l1.632-1.619a5.5 5.5 0 0 1 3.848-1.53"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
