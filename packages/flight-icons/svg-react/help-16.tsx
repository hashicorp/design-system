import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHelp16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m.007 9.5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM6.376 3.43a3.034 3.034 0 0 1 3.907.68 3.13 3.13 0 0 1 .717 2c0 .487-.092.905-.274 1.266a2.5 2.5 0 0 1-.68.817c-.193.156-.41.292-.581.399q-.051.03-.096.06a2.5 2.5 0 0 0-.452.338.65.65 0 0 0-.172.293.75.75 0 0 1-1.499-.033c0-.163.035-.324.086-.479.08-.243.232-.543.516-.832.238-.242.505-.419.718-.554l.127-.08c.169-.106.296-.186.415-.282a1 1 0 0 0 .279-.323c.059-.116.113-.296.113-.59 0-.383-.132-.754-.372-1.044a1.535 1.535 0 0 0-1.982-.348c-.318.191-.563.492-.687.851a.75.75 0 0 1-1.418-.49c.238-.69.71-1.275 1.335-1.648"
                />
            </svg>
        );
    }
);
