import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerraformFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#7b42bc"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1.625 6.157V3l2.718 1.579v3.156zm3.016-1.395L9.359 6.34v3.157L6.641 7.92zm3.016 4.735V6.34l2.718-1.578V7.92zm-3.016 1.924L9.359 13V9.843L6.64 8.265z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
