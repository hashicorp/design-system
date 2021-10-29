import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAzureColor16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill="#0089D6">
                    <path d="M7.47 12.412l3.348-.592.031-.007-1.722-2.049a291.474 291.474 0 01-1.722-2.058c0-.01 1.778-4.909 1.788-4.926.003-.006 1.214 2.084 2.934 5.066l2.95 5.115.023.039-10.948-.001 3.317-.587zM.9 11.788c0-.003.812-1.412 1.804-3.131L4.507 5.53l2.102-1.764C7.765 2.797 8.714 2 8.718 2a.37.37 0 01-.034.085L6.4 6.981 4.16 11.789l-1.63.002c-.896.001-1.63 0-1.63-.003z" />
                </g>
            </svg>
        );
    }
);
