import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLinode24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20 10.853l-2.657-1.531-2.242 1.426-.028 1.459-1.092-.749-1.482.942-.065-1.594-1.527-1.065 1.458-.787c-.01 0 0 .154-.215-5.222L8.699 2 4 3.522l1.049 5.266 1.577 1.278-1.2.588.785 3.97 1.1 1.077-.787.5.612 3.069L9.608 22c.012-.015.26-.215 3.175-2.635l-.085-2.085 1.252 1.108c.018-.019.269-.212 2.563-2.113l.088-1.542.945.684c.017-.018.232-.19 2.084-1.723l.37-2.84z"
                />
            </svg>
        );
    }
);
