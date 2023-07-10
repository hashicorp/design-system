import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVenafiColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#FF6333"
                    fillRule="evenodd"
                    d="M10.524 2.137A9.69 9.69 0 0110.572 2H15c-1.434 3.88-3.479 7.427-6.104 10.537L8 13.597l-.896-1.06C4.479 9.427 2.434 5.88 1 2h4.333l.048.137c.103.296.339.972.479 1.286H3.256a23.942 23.942 0 004.154 7.174l.611.722.612-.722a23.941 23.941 0 004.153-7.174h-2.74c.14-.314.375-.99.478-1.286zM8 7.614a13.78 13.78 0 001.855-3.268h1.44A16.613 16.613 0 018.421 9.3L8 9.801l-.422-.5a16.548 16.548 0 01-2.872-4.955h1.439A13.781 13.781 0 008 7.614z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
