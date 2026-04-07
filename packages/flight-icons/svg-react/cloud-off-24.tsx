import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M1.22 1.22a.753.753 0 0 1 1.061 0l20.5 20.5a.75.75 0 0 1 0 1.06.753.753 0 0 1-1.06 0l-2.001-2c-.51.144-1.046.22-1.586.22h-9.2c-1.67 0-3.31-.471-4.727-1.361a9 9 0 0 1-3.294-3.675 9.1 9.1 0 0 1-.867-4.87v-.002a9.06 9.06 0 0 1 1.82-4.598 9 9 0 0 1 1.802-1.766L1.221 2.28a.753.753 0 0 1 0-1.06m3.523 4.584a7.5 7.5 0 0 0-1.686 1.603 7.55 7.55 0 0 0-1.518 3.832v.003a7.6 7.6 0 0 0 .723 4.066 7.5 7.5 0 0 0 2.743 3.06A7.4 7.4 0 0 0 8.924 19.5h9.21q.149 0 .296-.01zm4.96-2.8a8.9 8.9 0 0 1 5.003 2.112 9 9 0 0 1 2.703 4.072c1.107.005 2.332.07 3.501.7a5.9 5.9 0 0 1 2.116 1.943 5.95 5.95 0 0 1 .511 5.564c-.16.38-.6.56-.981.401a.753.753 0 0 1-.402-.981 4.447 4.447 0 0 0-.383-4.16 4.4 4.4 0 0 0-1.575-1.446c-.964-.52-1.989-.521-3.292-.521h-.06a.755.755 0 0 1-.728-.568 7.5 7.5 0 0 0-2.387-3.866 7.4 7.4 0 0 0-4.16-1.757.754.754 0 0 1-.68-.813.753.753 0 0 1 .813-.68"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
