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
                <path fill="#0C67D6" d="M9.563 1L13 4.5H9.562V1z" />
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M3.938 15h8.124c.516 0 .938-.43.938-.954V4.5L9.562 1H3.939A.949.949 0 003 1.955v12.09c0 .525.422.955.938.955zm1.25-7.795h5.625v-.796H5.186v.796zm0 1.113h5.625v.796H5.186v-.796zm0 1.91H9.25v.795H5.187v-.796z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
