import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPath24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.5 1a3.5 3.5 0 1 1-.223 6.993c-.721 1.964-1.287 3.31-2.537 5.02a2 2 0 1 1-3.676.482c-1.652-1.102-3.219-1.705-5.453-2.31a2 2 0 0 1-1.8.806c-.576 1.189-.988 2.26-1.29 3.374-.313 1.153-.513 2.371-.645 3.836a2 2 0 1 1-1.497-.102c.138-1.54.35-2.859.693-4.126.335-1.235.791-2.406 1.407-3.674a2 2 0 1 1 3.503-1.567c2.379.643 4.12 1.308 5.978 2.559a2 2 0 0 1 1.604-.21c1.093-1.505 1.604-2.703 2.268-4.504A3.5 3.5 0 0 1 19.5 1m0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                />
            </svg>
        );
    }
);
