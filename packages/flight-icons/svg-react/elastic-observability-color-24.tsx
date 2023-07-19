import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconElasticObservabilityColor24 = forwardRef<
    SVGSVGElement,
    IconProps
>(({ color = 'currentColor', title, ...props }, svgRef) => {
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
            <g fillRule="evenodd" clipRule="evenodd">
                <path
                    fill="#F04E98"
                    d="M8.25 22H6.524c-2.153 0-3.899-1.96-3.899-4.377v-6.248H8.25V22z"
                />
                <path fill="#343741" d="M8.25 22h5.625V7H8.25v15z" />
                <path
                    fill="#07C"
                    d="M21.375 22H15.75V2l1.233.015c2.433.03 4.392 2.317 4.392 5.128V22z"
                />
            </g>
        </svg>
    );
});
