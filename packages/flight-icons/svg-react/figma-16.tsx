import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFigma16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M3 3.62C3 2.172 4.205 1 5.691 1h4.618C11.795 1 13 2.173 13 3.62a2.6 2.6 0 01-1.215 2.19A2.6 2.6 0 0113 8c0 1.447-1.205 2.62-2.691 2.62h-.059a2.723 2.723 0 01-1.81-.681v2.413C8.44 13.818 7.205 15 5.707 15 4.223 15 3 13.83 3 12.38a2.6 2.6 0 011.215-2.19A2.6 2.6 0 013 8a2.6 2.6 0 011.215-2.19A2.6 2.6 0 013 3.62zm4.56 2.619H5.69c-1 0-1.81.788-1.81 1.761 0 .97.805 1.755 1.799 1.761h1.879V6.24zM8.44 8c0 .973.811 1.761 1.81 1.761h.059c1 0 1.81-.788 1.81-1.76 0-.974-.81-1.762-1.81-1.762h-.059c-.999 0-1.81.788-1.81 1.761zm-2.749 2.62H5.68c-.994.005-1.798.792-1.798 1.76 0 .97.82 1.762 1.824 1.762 1.019 0 1.853-.805 1.853-1.79V10.62H5.691zm0-8.762H7.56v3.523H5.691c-1 0-1.81-.789-1.81-1.762 0-.972.81-1.761 1.81-1.761zm2.75 3.523V1.858h1.868c1 0 1.81.789 1.81 1.761 0 .973-.81 1.762-1.81 1.762H8.44z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
