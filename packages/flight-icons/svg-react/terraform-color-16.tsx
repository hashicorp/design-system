import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerraformColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#7B42BC" fillRule="evenodd" clipRule="evenodd">
                    <path d="M5.825 2.82l4.35 2.524v5.052L5.825 7.87V2.82zM10.651 5.344v5.052L15 7.87V2.82l-4.349 2.524zM1 0v5.05l4.349 2.527V2.526L1 0zM5.825 13.474L10.174 16v-5.051L5.825 8.423v5.051z" />
                </g>
            </svg>
        );
    }
);
