import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleFormsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#7248b9"
                    d="M12.063 15H3.937A.95.95 0 0 1 3 14.046V1.955C3 1.43 3.422 1 3.938 1h5.624L13 4.5v9.546a.95.95 0 0 1-.937.954"
                />
                <path fill="#56368a" d="M9.563 1 13 4.5H9.563z" />
                <path
                    fill="#fdffff"
                    d="M10.813 7.204H6.75V6.41h4.063zm0 1.114H6.75v.796h4.063zm0 1.91H6.75v.795h4.063zM5.969 6.807a.434.434 0 0 1-.43.437.434.434 0 0 1-.43-.437c0-.242.193-.438.43-.438s.43.196.43.438M5.969 8.716a.434.434 0 0 1-.43.437.434.434 0 0 1-.43-.437c0-.242.193-.438.43-.438s.43.196.43.438M5.969 10.625a.434.434 0 0 1-.43.437.434.434 0 0 1-.43-.437c0-.242.193-.438.43-.438s.43.196.43.438"
                />
            </svg>
        );
    }
);
