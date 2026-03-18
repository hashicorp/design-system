import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDelay24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 8.747-5.788.75.75 0 1 1 1.382.583q-.107.255-.23.506v.002A11 11 0 0 1 12 23C5.925 23 1 18.075 1 12S5.925 1 12 1q.279 0 .555.014a.75.75 0 0 1-.079 1.498A9 9 0 0 0 12 2.5M14.823 2.136a.75.75 0 0 1 .97-.427q.52.203 1.01.455a.75.75 0 0 1-.687 1.334 9 9 0 0 0-.866-.39.75.75 0 0 1-.428-.972M18.414 4.112a.75.75 0 0 1 1.06-.011q.395.386.749.807a.75.75 0 1 1-1.147.966 10 10 0 0 0-.651-.702.75.75 0 0 1-.01-1.06M20.977 7.315a.75.75 0 0 1 .99.381q.224.503.398 1.026a.75.75 0 1 1-1.422.476q-.153-.455-.347-.893a.75.75 0 0 1 .38-.99M22.174 11.239a.75.75 0 0 1 .768.73q.015.552-.029 1.107a.75.75 0 0 1-1.495-.118q.037-.476.025-.95a.75.75 0 0 1 .73-.77" />
                    <path d="M12.5 5.75a.75.75 0 0 0-1.5 0V12c0 .284.16.544.415.67l4.5 2.25a.75.75 0 1 0 .67-1.34L12.5 11.536z" />
                </g>
            </svg>
        );
    }
);
