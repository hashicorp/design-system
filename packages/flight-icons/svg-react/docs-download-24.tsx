import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconDocsDownload24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <g fill={color}>
                    <path d="M3 3.75A2.75 2.75 0 015.75 1h13.5c.966 0 1.75.784 1.75 1.75v6.5a.75.75 0 01-1.5 0v-6.5a.25.25 0 00-.25-.25H5.75c-.69 0-1.25.56-1.25 1.25V17.8c.375-.192.8-.3 1.25-.3h1.5a.75.75 0 010 1.5h-1.5a1.25 1.25 0 100 2.5h3a.75.75 0 010 1.5h-3A2.75 2.75 0 013 20.25V3.75z" />
                    <path d="M12.97 17.22a.75.75 0 011.06 0l1.22 1.22v-4.69a.75.75 0 011.5 0v4.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.747.747 0 01-1.06 0l-2.5-2.5a.75.75 0 010-1.06z" />
                    <path
                        fillRule="evenodd"
                        d="M16 10a7 7 0 100 14 7 7 0 000-14zm-5.5 7a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
