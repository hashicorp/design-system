import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPaperclip24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.071 1a4.8 4.8 0 0 1 3.367 1.384 4.72 4.72 0 0 1 1.399 3.346 4.73 4.73 0 0 1-1.398 3.348l-9.23 9.14c-.516.512-1.22.8-1.947.801-.728 0-1.43-.29-1.948-.8a2.73 2.73 0 0 1 0-3.88l8.518-8.435a.754.754 0 0 1 1.06.005.76.76 0 0 1-.005 1.06L7.37 15.405a1.234 1.234 0 0 0 0 1.75c.235.23.558.365.892.365.333-.001.658-.134.891-.366l9.23-9.14c.61-.606.954-1.43.954-2.283s-.345-1.676-.954-2.282A3.3 3.3 0 0 0 16.07 2.5c-.866 0-1.699.344-2.31.948l-9.219 9.14A5.2 5.2 0 0 0 3 16.28c0 1.383.554 2.71 1.542 3.69a5.31 5.31 0 0 0 7.46 0l9.22-9.141a.754.754 0 0 1 1.06.004.76.76 0 0 1-.005 1.06l-9.218 9.141a6.811 6.811 0 0 1-9.573 0A6.7 6.7 0 0 1 1.5 16.28c0-1.784.715-3.495 1.985-4.755l9.22-9.14A4.8 4.8 0 0 1 16.07 1"
                />
            </svg>
        );
    }
);
