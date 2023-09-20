import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleDocsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill="#3086F6"
                    d="M12.063 15H3.937A.949.949 0 013 14.046V1.955C3 1.43 3.422 1 3.938 1h5.624L13 4.5v9.546a.949.949 0 01-.938.954z"
                />
                <path fill="#0C67D6" d="M9.563 1L13 4.5H9.562V1z" />
                <path
                    fill="#FDFFFF"
                    d="M10.813 7.205H5.186v-.796h5.625v.796zm0 1.113H5.186v.796h5.625v-.796zm-1.563 1.91H5.187v.795H9.25v-.796z"
                />
            </svg>
        );
    }
);
