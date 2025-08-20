import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPinOff16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M5.925 6.074a.75.75 0 111.06 1.06l-.66.661a.75.75 0 01-.448.215l-2.051.228c.516.712 1.2 1.61 1.763 2.173.562.562 1.46 1.247 2.173 1.762l.228-2.05.025-.125a.752.752 0 01.19-.323l.695-.694a.75.75 0 011.06 1.06l-.509.51-.247 2.23c-.103.924-1.16 1.434-1.944.88-.58-.41-1.458-1.053-2.18-1.681l-2.8 2.8a.75.75 0 01-1.06-1.06l2.8-2.8c-.628-.723-1.272-1.6-1.681-2.18-.555-.785-.044-1.84.88-1.944l2.231-.249.475-.473zM9.12 1.4a1.25 1.25 0 011.665-.077l.095.085 3.708 3.709a1.25 1.25 0 010 1.767l-2.015 2.014a.75.75 0 11-1.06-1.06L13.35 6 9.994 2.644 8.111 4.492a.75.75 0 01-1.05-1.072L9.12 1.4z" />
                    <path d="M1.47 1.47a.75.75 0 011.06 0l12.5 12.5a.75.75 0 11-1.06 1.06L1.47 2.53a.75.75 0 010-1.06z" />
                </g>
            </svg>
        );
    }
);
