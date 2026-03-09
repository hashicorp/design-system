import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMusic16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.953 1.962A1.751 1.751 0 0115 3.686v7.47a2.75 2.75 0 01-2.317 2.716l-.68.107A2.167 2.167 0 019.5 11.842a2.17 2.17 0 011.824-2.137l2.176-.346V3.686a.252.252 0 00-.292-.247l-6.5 1.122a.256.256 0 00-.208.246v7.349a2.75 2.75 0 01-2.317 2.716l-.68.107A2.167 2.167 0 011 12.842a2.17 2.17 0 011.824-2.137L5 10.359V4.807a1.756 1.756 0 011.453-1.724l6.5-1.121zM3.06 12.186a.67.67 0 00-.56.656c0 .407.367.717.769.656l.677-.108A1.251 1.251 0 005 12.156v-.278l-1.94.308zm8.5-1a.67.67 0 00-.56.656c0 .407.367.717.769.656l.677-.108a1.251 1.251 0 001.054-1.234v-.278l-1.94.308z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
