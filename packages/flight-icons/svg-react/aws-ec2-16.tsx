import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsEc216 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.602.66 7.998 0 15 3.314v9.372L7.998 16l-1.396-.66zM5.38 1.238 4.3 1.75v12.502l1.08.51zM2.476 2.612l.863-.406v11.588l-.863-.406zM1.7 2.98V13.02l-.7-.332V3.312z" />
                </g>
            </svg>
        );
    }
);
