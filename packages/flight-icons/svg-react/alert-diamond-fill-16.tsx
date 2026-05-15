import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamondFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.407.752A2.25 2.25 0 0 1 9.59.753l5.657 5.656a2.25 2.25 0 0 1 0 3.182L9.59 15.248a2.25 2.25 0 0 1-3.182 0L.75 9.591a2.25 2.25 0 0 1 0-3.182zM8 10a1 1 0 1 0 0 2h.007a1 1 0 0 0 0-2zm0-5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
