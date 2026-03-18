import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVenafi16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.524 2.137 10.572 2H15c-1.434 3.88-3.479 7.427-6.104 10.537L8 13.597l-.896-1.06C4.479 9.427 2.434 5.88 1 2h4.333l.048.137c.103.296.339.972.479 1.286H3.256a24 24 0 0 0 4.154 7.174l.611.722.612-.722a24 24 0 0 0 4.153-7.174h-2.74c.14-.314.375-.99.478-1.286M8 7.614a13.8 13.8 0 0 0 1.855-3.268h1.44A16.6 16.6 0 0 1 8.421 9.3L8 9.801l-.422-.5a16.6 16.6 0 0 1-2.872-4.955h1.439A13.8 13.8 0 0 0 8 7.614"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
