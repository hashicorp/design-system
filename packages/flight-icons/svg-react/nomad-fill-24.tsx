import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNomadFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M13.254 13.863l1.865-1.066.005-5.325-2.23 1.322v2.603l-2.33-1.216-1.681 1.018v5.33L11 15.198v-2.55l2.253 1.214z" />
                    <path
                        fillRule="evenodd"
                        d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm3 8l7-4 7 4v8l-7 4-7-4V8z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
