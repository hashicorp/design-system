import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDatastax16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 1h14v14H1V1zm1.094 6.446h.988l.248.192v.724l-.248.192h-.988V7.446zm.191.192v.724h.854v-.724h-.854zm2.102-.192h-.175l-.64 1.108h.222l.506-.876.505.876h.221l-.64-1.108zm4.784.192v-.192h-.914l-.248.192V7.9l.248.191h.797v.27h-.996v.192h.94l.247-.192v-.27l-.248-.191H8.2v-.263h.971zm-4.12-.192h1.237v.192h-.523v.916h-.191v-.916H5.05v-.192zm5.738 0H9.553v.192h.522v.916h.192v-.916h.522v-.192zM13.05 8l-.32-.554h-.22l.32.554-.32.554h.22L13.05 8zm.635-.554l-.32.554.32.554h.221L13.586 8l.32-.554h-.221zm-6.732 0h.174l.64 1.108h-.221l-.506-.876-.506.876h-.22l.639-1.108zm4.675 0h-.174l-.64 1.108h.221l.506-.876.506.876h.22l-.639-1.108z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
