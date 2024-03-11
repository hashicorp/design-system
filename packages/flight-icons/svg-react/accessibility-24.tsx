import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAccessibility24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M9.708 11.454c.445.164 1.01.353 1.542.46v2.859l-1.874 2.811a.75.75 0 101.248.832L12 16.352l1.376 2.064a.75.75 0 101.248-.832l-1.874-2.811v-2.859a10.8 10.8 0 001.542-.46 19.84 19.84 0 001.244-.51l.02-.01.006-.002.003-.001a.75.75 0 10-.63-1.362l-.004.002-.016.007a9.466 9.466 0 01-.314.138c-.212.09-.505.21-.829.33-.688.255-1.381.454-1.772.454-.39 0-1.084-.2-1.772-.454a18.412 18.412 0 01-1.143-.468l-.016-.007-.004-.002a.75.75 0 10-.629 1.362l.002.001.006.003.02.009a11.244 11.244 0 00.347.152c.228.097.544.227.897.358zM8.75 10.25c-.315.68-.314.681-.314.681l.314-.681z"
                        clipRule="evenodd"
                    />
                    <path d="M12 9.5A1.75 1.75 0 1012 6a1.75 1.75 0 000 3.5z" />
                    <path
                        fillRule="evenodd"
                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
