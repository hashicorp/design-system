import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFlag24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M7.875 1c-1.632 0-2.76.273-3.502.572-.371.149-.643.303-.83.429a2.719 2.719 0 00-.22.162l-.104.094A.75.75 0 003 2.786V22.25a.75.75 0 001.5 0V15.6c.104-.06.246-.133.432-.208.546-.219 1.481-.463 2.943-.463 1.382 0 2.543.458 3.845.981l.044.018c1.264.508 2.669 1.072 4.361 1.072 1.632 0 2.76-.273 3.502-.572.371-.149.643-.303.83-.429 0 0 .184-.115.325-.256a.75.75 0 00.218-.529V2.786a.75.75 0 00-1.27-.541l-.008.007a1.23 1.23 0 01-.099.072 3.038 3.038 0 01-.555.284c-.546.219-1.481.463-2.943.463-1.382 0-2.543-.458-3.845-.981l-.044-.018C10.972 1.564 9.567 1 7.875 1zM4.5 13.951V3.171c.104-.06.246-.133.432-.207.546-.22 1.481-.464 2.943-.464 1.382 0 2.543.458 3.845.982l.044.017c1.264.508 2.669 1.072 4.361 1.072 1.541 0 2.633-.244 3.375-.522v10.78c-.104.06-.246.133-.432.207-.546.22-1.481.464-2.943.464-1.382 0-2.543-.458-3.845-.982l-.044-.017c-1.264-.508-2.669-1.072-4.361-1.072-1.541 0-2.633.243-3.375.522z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
