import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEdit16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6 2a.75.75 0 0 1 0 1.5H3.25a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V9A.75.75 0 0 1 15 9v4.75A2.25 2.25 0 0 1 12.75 16h-9.5A2.25 2.25 0 0 1 1 13.75v-9.5A2.25 2.25 0 0 1 3.25 2zm5.437-.994A1.75 1.75 0 0 1 13.9.79l.704.59a1.75 1.75 0 0 1 .214 2.465l-5.704 6.797A4.75 4.75 0 0 1 7.62 11.83l-2.572 1.299a.75.75 0 0 1-1.056-.886l.832-2.758a4.8 4.8 0 0 1 .91-1.68zM6.88 8.767a3.3 3.3 0 0 0-.621 1.15L5.933 11l1.01-.51a3.3 3.3 0 0 0 1.024-.811l4.206-5.013-1.082-.915zm6.057-6.828a.25.25 0 0 0-.353.03l-.53.633 1.082.914.534-.635a.25.25 0 0 0-.031-.353z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
