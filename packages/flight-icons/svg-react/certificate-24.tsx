import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCertificate24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    d="M18.25 1A2.75 2.75 0 0 1 21 3.75v14.5A2.75 2.75 0 0 1 18.25 21h-1.485l.22 1.102a.751.751 0 0 1-1.054.827L12 21.079l-3.93 1.85a.75.75 0 0 1-1.055-.826L7.235 21H5.75A2.75 2.75 0 0 1 3 18.25V3.75A2.75 2.75 0 0 1 5.75 1zm-3.749 16.33c-.736.426-1.59.67-2.501.67a5 5 0 0 1-2.501-.67l-.722 3.608 2.904-1.367a.75.75 0 0 1 .638 0l2.904 1.366zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h1.785l.653-3.265a5 5 0 1 1 7.623 0l.654 3.265h1.785c.69 0 1.25-.56 1.25-1.25V3.75c0-.69-.56-1.25-1.25-1.25zm6.25 7a3.5 3.5 0 0 0-2.542 5.906q.076.06.136.135A3.5 3.5 0 0 0 12 16.5c.932 0 1.779-.365 2.406-.959a.8.8 0 0 1 .136-.135A3.5 3.5 0 0 0 12 9.5M14 5a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 10 5z"
                />
            </svg>
        );
    }
);
