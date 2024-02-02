import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackerFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm7.828 5.03L6.227 3v1.408l2.45 1.384v4.228l1.152.647c.713.403 1.296.166 1.296-.535V7.029c0-.697-.586-1.596-1.297-2zm-4.953-.808l3.313 1.873V13l-3.313-1.873V4.222z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
