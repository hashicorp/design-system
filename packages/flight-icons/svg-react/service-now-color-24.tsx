import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServiceNowColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill="#62d84e"
                    fillRule="evenodd"
                    d="M12.067 2C6.038 1.964 1.054 6.918 1 13.002a11.1 11.1 0 0 0 3.457 8.167 2.176 2.176 0 0 0 2.84.152c1.251-.978 2.859-1.57 4.708-1.57s3.456.583 4.707 1.57c.857.673 2.063.583 2.85-.17A11.1 11.1 0 0 0 23 13.092C23 6.99 18.105 2.036 12.067 2m-.071 16.638c-3.27 0-5.502-2.468-5.502-5.528s2.233-5.564 5.502-5.564 5.502 2.513 5.502 5.564-2.233 5.528-5.502 5.528"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
