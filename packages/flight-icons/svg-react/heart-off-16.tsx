import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHeartOff16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M1.78.72A.75.75 0 0 0 .72 1.78l.58.581A4.5 4.5 0 0 0 0 5.522a4.5 4.5 0 0 0 1.34 3.2l6.133 6.061a.75.75 0 0 0 1.054 0l2.613-2.582 3.08 3.08a.75.75 0 1 0 1.06-1.061zm8.3 10.42L2.36 3.422a3 3 0 0 0-.861 2.1 3 3 0 0 0 .895 2.134L8 13.196z"
                        clipRule="evenodd"
                    />
                    <path d="M11.434 1a4.6 4.6 0 0 0-3.226 1.322l-.735.726a.75.75 0 0 0 1.054 1.067l.735-.727a3.104 3.104 0 0 1 4.342 0 2.981 2.981 0 0 1 0 4.267l-.735.727a.75.75 0 1 0 1.055 1.067l.735-.726a4.5 4.5 0 0 0 .992-1.467 4.48 4.48 0 0 0-.992-4.934A4.604 4.604 0 0 0 11.433 1" />
                </g>
            </svg>
        );
    }
);
