import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconThumbsUp16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
