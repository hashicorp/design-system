import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLinode16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14 7.197l-1.993-1.072-1.682.998-.02 1.022-.819-.524-1.112.66-.049-1.117-1.145-.745 1.094-.55c-.008 0 0 .106-.162-3.656L5.524 1 2 2.066l.787 3.686 1.183.894-.9.412.588 2.778.826.755-.59.35.458 2.148L6.206 15c.009-.01.195-.15 2.381-1.845l-.064-1.459.94.776c.013-.014.2-.149 1.921-1.48l.067-1.079.709.479c.012-.013.173-.133 1.562-1.206L14 7.197z"
                />
            </svg>
        );
    }
);
