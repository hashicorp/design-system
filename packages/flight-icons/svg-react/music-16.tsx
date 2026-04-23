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
                    d="M12.953 1.961A1.75 1.75 0 0 1 15 3.686v7.47a2.75 2.75 0 0 1-2.317 2.715l-.68.108A2.167 2.167 0 0 1 9.5 11.842a2.17 2.17 0 0 1 1.824-2.138L13.5 9.36V3.686a.252.252 0 0 0-.292-.247l-6.5 1.122a.256.256 0 0 0-.208.246v7.349a2.75 2.75 0 0 1-2.317 2.715l-.68.108A2.167 2.167 0 0 1 1 12.842a2.17 2.17 0 0 1 1.824-2.138L5 10.36V4.807a1.76 1.76 0 0 1 1.453-1.725zM3.06 12.186a.67.67 0 0 0-.56.656c0 .407.367.717.769.655l.677-.107A1.25 1.25 0 0 0 5 12.156v-.279zm8.5-1a.67.67 0 0 0-.56.656c0 .407.367.717.769.655l.677-.107a1.25 1.25 0 0 0 1.054-1.234v-.279z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
