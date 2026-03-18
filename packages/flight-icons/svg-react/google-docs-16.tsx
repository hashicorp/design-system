import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleDocs16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#0c67d6" d="M9.563 1 13 4.5H9.563z" />
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M3.938 15h8.124c.516 0 .938-.43.938-.954V4.5L9.563 1H3.936A.95.95 0 0 0 3 1.955v12.09c0 .525.422.955.938.955m1.25-7.795h5.625v-.796H5.187zm0 1.113h5.625v.796H5.187zm0 1.91H9.25v.795H5.188z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
