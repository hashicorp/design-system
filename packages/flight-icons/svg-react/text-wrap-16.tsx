import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTextWrap16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M1.75 1a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V1.75A.75.75 0 011.75 1zM14.25 1a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V1.75a.75.75 0 01.75-.75zM9.176 5.004c.867.04 1.558.38 2.055.895C11.787 6.476 12 7.222 12 8c0 .766-.193 1.518-.778 2.104C10.69 10.633 9.97 11 9 11H7.368l.153.146.053.056a.75.75 0 01-1.032 1.077l-.058-.05-1.5-1.438-.052-.056a.746.746 0 01-.078-.111c-.005-.007-.008-.015-.012-.022-.011-.021-.023-.043-.032-.065l-.01-.025-.013-.044a.746.746 0 01-.021-.085l-.005-.033a.749.749 0 01.043-.37l.015-.036a.742.742 0 01.045-.086l.016-.025a.747.747 0 01.092-.113l1.5-1.5.057-.052a.75.75 0 011.055 1.056l-.052.056-.22.22H9c.547 0 .893-.189 1.161-.457.214-.214.339-.525.339-1.043 0-.506-.134-.836-.349-1.06-.21-.217-.51-.391-.953-.431L9 6.5H4.75a.75.75 0 010-1.5H9l.176.004z" />
                </g>
            </svg>
        );
    }
);
