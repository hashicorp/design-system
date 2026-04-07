import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGift16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.286 0c.724 0 1.416.293 1.924.81A2.77 2.77 0 0 1 14.703 4h.547a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75H14v6.25a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75V9H.75A.75.75 0 0 1 0 8.25v-3.5A.75.75 0 0 1 .75 4h1.047A2.78 2.78 0 0 1 2.29.81C2.798.294 3.49 0 4.214 0c1.799 0 2.878 1.318 3.459 2.394.263.486.45.967.577 1.351.127-.384.314-.865.577-1.351C9.408 1.318 10.487 0 12.287 0M3.5 14.5h4V9h-4zm5.5 0h3.5V9H9zm-7.5-7h6v-2h-6zm7.5 0h5.5v-2H9zm-4.786-6c-.318 0-.625.128-.854.361-.229.234-.36.553-.36.889s.131.655.36.889c.23.233.536.36.854.361H6.75a7 7 0 0 0-.397-.894c-.5-.924-1.19-1.606-2.14-1.606m8.072 0c-.95 0-1.64.682-2.14 1.606A7 7 0 0 0 9.75 4h2.537c.318 0 .625-.128.854-.361.229-.234.36-.553.36-.889s-.131-.655-.36-.889a1.2 1.2 0 0 0-.854-.361"
                />
            </svg>
        );
    }
);
