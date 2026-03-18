import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOpa16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.462 7.942a5.64 5.64 0 0 1 1.216-2.299c-.187-.147-.928-.755-.963-1.232C3.661 3.629 4.403 1 4.403 1s-2.24 2.876-2.395 4.039C1.884 5.95 3.3 7.76 3.449 7.945v-.003zm9.114-.047V7.9q.001.006.003.01c.248-.314 1.53-2 1.413-2.872C13.838 3.876 11.598 1 11.598 1s.742 2.629.688 3.41c-.032.458-.707 1.03-.932 1.21a5.6 5.6 0 0 1 1.223 2.275" />
                    <path d="M12.576 7.898v-.006a5.6 5.6 0 0 0-1.223-2.275c-.87-.97-2.056-1.55-3.333-1.55v3.106h.004c.313.004.567.274.567.605q0 .06-.01.114a.58.58 0 0 1-.557.49h-.01v1.153l-.006 5.458h.11s1.205-1.837 1.854-2.361c.76-.615 2.604-1.377 2.604-1.377v-3.32l.01-.003q-.004-.012-.007-.024 0-.004-.003-.01" />
                    <path d="M8.014 8.386a.58.58 0 0 1-.548-.444.7.7 0 0 1-.022-.16c0-.335.257-.605.573-.605h.004V4.08c-1.284 0-2.471.585-3.343 1.563a5.6 5.6 0 0 0-1.216 2.299h-.01v3.363s1.844.762 2.604 1.377c.63.51 1.847 2.318 1.847 2.318h.114v-.003h-.006z" />
                </g>
            </svg>
        );
    }
);
