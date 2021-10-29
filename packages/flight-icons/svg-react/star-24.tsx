import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconStar24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    fill={color}
                    fillRule="evenodd"
                    d="M12 1a.75.75 0 01.673.418l2.992 6.065 6.694.978a.75.75 0 01.414 1.28l-4.842 4.717 1.143 6.665a.75.75 0 01-1.089.79L12 18.766l-5.985 3.149a.75.75 0 01-1.089-.79l1.143-6.666-4.842-4.717a.75.75 0 01.414-1.28l6.693-.978 2.993-6.065A.75.75 0 0112 1zm0 2.445L9.505 8.5a.75.75 0 01-.564.41l-5.58.816 4.037 3.933a.75.75 0 01.216.664l-.952 5.556 4.989-2.625a.75.75 0 01.698 0l4.99 2.625-.953-5.556a.75.75 0 01.216-.664l4.037-3.933-5.58-.816a.75.75 0 01-.564-.41L12 3.445z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
