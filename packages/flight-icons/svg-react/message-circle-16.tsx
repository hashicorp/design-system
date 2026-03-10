import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.231 1A6.771 6.771 0 0115 7.769a6.771 6.771 0 01-9.795 6.055 1.567 1.567 0 00-.113.016c-.171.029-.405.09-.678.176-.544.17-1.172.417-1.65.615-.208.086-.387.163-.512.218l-.146.063-.037.017-.01.004h-.002a.75.75 0 01-.99-.994l.001-.002.004-.008.017-.037a24.984 24.984 0 00.28-.65c.198-.475.446-1.102.618-1.646.087-.274.146-.507.175-.679.008-.051.013-.09.016-.118A6.769 6.769 0 018.232 1zm0 1.5a5.269 5.269 0 00-4.676 7.7c.104.199.123.404.124.534.003.145-.014.292-.037.428a6.74 6.74 0 01-.225.885c-.085.27-.186.554-.288.827.275-.103.563-.204.834-.289.3-.095.61-.18.879-.225.133-.022.282-.04.423-.038.128.002.335.019.535.122a5.271 5.271 0 007.7-4.676A5.271 5.271 0 008.23 2.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
