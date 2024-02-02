import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerraformFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm3 9.05V4l4.349 2.526v5.05L5 9.052zm4.825-2.23l4.35 2.524v5.052l-4.35-2.526V6.82zm4.826 2.524L19 6.819v5.05l-4.349 2.527V9.344zm-4.826 8.13L14.174 20v-5.05l-4.349-2.527v5.051z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
