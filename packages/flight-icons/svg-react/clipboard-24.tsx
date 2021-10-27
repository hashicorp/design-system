import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconClipboard24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M8.75 1A1.75 1.75 0 007 2.75V3H5.75A2.75 2.75 0 003 5.75v14.5A2.75 2.75 0 005.75 23h12.5A2.75 2.75 0 0021 20.25V5.75A2.75 2.75 0 0018.25 3H17v-.25A1.75 1.75 0 0015.25 1h-6.5zm8.232 3.5A1.75 1.75 0 0115.25 6h-6.5a1.75 1.75 0 01-1.732-1.5H5.75c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25h-1.268zM8.5 2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v1.5a.25.25 0 01-.25.25h-6.5a.25.25 0 01-.25-.25v-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
