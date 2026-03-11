import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSwitcher24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.75 17c.69 0 1.25.56 1.25 1.25v3.5C7 22.44 6.44 23 5.75 23h-3.5C1.56 23 1 22.44 1 21.75v-3.5c0-.69.56-1.25 1.25-1.25h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5C9.56 23 9 22.44 9 21.75v-3.5c0-.69.56-1.25 1.25-1.25h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5c-.69 0-1.25-.56-1.25-1.25v-3.5c0-.69.56-1.25 1.25-1.25h3.5zm-16-8C6.44 9 7 9.56 7 10.25v3.5C7 14.44 6.44 15 5.75 15h-3.5C1.56 15 1 14.44 1 13.75v-3.5C1 9.56 1.56 9 2.25 9h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5C9.56 15 9 14.44 9 13.75v-3.5C9 9.56 9.56 9 10.25 9h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5c-.69 0-1.25-.56-1.25-1.25v-3.5c0-.69.56-1.25 1.25-1.25h3.5zm-16-8C6.44 1 7 1.56 7 2.25v3.5C7 6.44 6.44 7 5.75 7h-3.5C1.56 7 1 6.44 1 5.75v-3.5C1 1.56 1.56 1 2.25 1h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5C15 6.44 14.44 7 13.75 7h-3.5C9.56 7 9 6.44 9 5.75v-3.5C9 1.56 9.56 1 10.25 1h3.5zm8 0c.69 0 1.25.56 1.25 1.25v3.5C23 6.44 22.44 7 21.75 7h-3.5C17.56 7 17 6.44 17 5.75v-3.5c0-.69.56-1.25 1.25-1.25h3.5z"
                />
            </svg>
        );
    }
);
