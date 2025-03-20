import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleDriveColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#0066DA"
                    d="M2.058 12.285l.618 1.023c.128.215.313.384.529.507l2.205-3.661H1c0 .238.064.477.192.692l.866 1.439z"
                />
                <path
                    fill="#00AC47"
                    d="M8 5.846L5.795 2.185c-.217.123-.401.292-.53.507l-4.073 6.77a1.35 1.35 0 00-.192.692h4.41L8 5.846z"
                />
                <path
                    fill="#EA4335"
                    d="M12.795 13.815c.216-.123.4-.292.53-.507l.256-.423 1.227-2.039a1.35 1.35 0 00.192-.692h-4.41l.938 1.769 1.267 1.892z"
                />
                <path
                    fill="#00832D"
                    d="M8 5.846l2.205-3.661A1.456 1.456 0 009.483 2H6.517c-.257 0-.506.07-.722.185L8 5.846z"
                />
                <path
                    fill="#2684FC"
                    d="M10.59 10.154H5.41l-2.205 3.661c.217.123.465.185.722.185h8.146c.257 0 .505-.07.722-.185l-2.205-3.661z"
                />
                <path
                    fill="#FFBA00"
                    d="M12.77 6.077l-2.036-3.385a1.428 1.428 0 00-.529-.507L8 5.846l2.59 4.308h4.402a1.35 1.35 0 00-.193-.693l-2.028-3.384z"
                />
            </svg>
        );
    }
);
