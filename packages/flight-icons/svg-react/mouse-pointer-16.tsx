import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMousePointer16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M1.72 1.72a.75.75 0 0 1 .818-.162l11.5 4.79c.287.121.472.407.462.718a.75.75 0 0 1-.509.685l-3.866 1.313 3.655 3.656a.75.75 0 0 1 0 1.06.75.75 0 0 1-1.06 0l-3.656-3.655-1.313 3.866a.75.75 0 0 1-.685.509.75.75 0 0 1-.717-.462l-4.791-11.5a.75.75 0 0 1 .162-.818m5.25 9.908L8.032 8.5a.75.75 0 0 1 .469-.469l3.127-1.062-7.985-3.327z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
