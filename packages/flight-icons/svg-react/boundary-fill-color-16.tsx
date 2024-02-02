import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBoundaryFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#F24C53"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.007 12.375v-.678h1.405v-.42h-.681v-.682h3.218L8.454 8l1.495-2.596H6.65v3.6H4.875V3.625h6.11l1.019 1.77L10.504 8l1.53 2.658-.99 1.717H6.008zm.273-1.78h-.681v.683h.68v-.683zm-.724 1.097h-.681v.682h.68v-.682z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
