import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNomadFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.784 9.165l1.165-.667.004-3.328-1.394.827v1.626l-1.457-.76-1.05.636v3.331L7.376 10V8.405l1.408.759z" />
                    <path
                        fillRule="evenodd"
                        d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm1.625 5.5L8 3l4.375 2.5v5L8 13l-4.375-2.5v-5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
