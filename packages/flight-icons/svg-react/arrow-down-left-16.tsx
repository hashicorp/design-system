import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowDownLeft16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    d="M12.78 4.28a.75.75 0 00-1.06-1.06L4.5 10.44V6.75a.75.75 0 00-1.5 0v5.5a.748.748 0 00.75.75h5.5a.75.75 0 000-1.5H5.56l7.22-7.22z"
                />
            </svg>
        );
    }
);
