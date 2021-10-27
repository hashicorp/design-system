import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFileDiff16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    <path d="M8.5 6.25a.75.75 0 00-1.5 0V7.5H5.75a.75.75 0 000 1.5H7v1.25a.75.75 0 001.5 0V9h1.25a.75.75 0 000-1.5H8.5V6.25zM5.75 11.5a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z" />
                    <path
                        fillRule="evenodd"
                        d="M1 2.25A2.25 2.25 0 013.25 0h6.293c.331 0 .65.132.884.366l4.207 4.207c.234.235.366.553.366.884v8.293A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75V2.25zm2.25-.75a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V6H9.75A.75.75 0 019 5.25V1.5H3.25zm7.25 1.06l1.94 1.94H10.5V2.56z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
