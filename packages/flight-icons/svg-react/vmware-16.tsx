import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVmware16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.677 5.14c-.201-.46-.698-.67-1.162-.454-.465.216-.636.756-.426 1.218l1.949 4.436c.306.696.63 1.06 1.236 1.06.647 0 .93-.397 1.236-1.06l1.717-3.916a.247.247 0 01.245-.165c.146 0 .27.123.27.287v3.79c0 .585.308 1.064.904 1.064.595 0 .916-.48.916-1.063V7.235c0-.599.41-.987.968-.987s.929.402.929.987v3.102c0 .584.31 1.063.905 1.063s.918-.48.918-1.063V7.235c0-.599.408-.987.966-.987.557 0 .93.402.93.987v3.102c0 .584.31 1.063.905 1.063.594 0 .917-.48.917-1.063v-3.53c0-1.298-.996-2.207-2.195-2.207-1.197 0-1.947.868-1.947.868-.4-.542-.949-.867-1.878-.867-.982 0-1.84.867-1.84.867-.4-.542-1.078-.867-1.64-.867-.87 0-1.56.4-1.982 1.41L3.274 9.082 1.677 5.14z"
                />
            </svg>
        );
    }
);
