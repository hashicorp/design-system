import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTriangle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2c.472 0 .934.127 1.342.366.407.24.746.581.984.99l.002.004 8.316 14.46c.233.421.355.896.356 1.378a2.86 2.86 0 0 1-.35 1.38 2.76 2.76 0 0 1-.975 1.03c-.41.25-.877.386-1.357.392H3.682a2.65 2.65 0 0 1-1.357-.393 2.76 2.76 0 0 1-.975-1.029 2.86 2.86 0 0 1 .007-2.758l.005-.01 8.31-14.45.002-.004c.238-.409.577-.75.984-.99C11.066 2.127 11.528 2 12 2m0 1.5c-.202 0-.403.055-.583.16s-.334.26-.445.45l-.001.001-8.305 14.442a1.36 1.36 0 0 0-.001 1.305c.108.198.263.359.444.47.18.11.382.169.586.172h16.61c.204-.003.406-.062.586-.172.18-.111.336-.272.444-.47a1.36 1.36 0 0 0-.001-1.305L13.029 4.11V4.11a1.25 1.25 0 0 0-.446-.449c-.18-.105-.38-.16-.583-.16"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
