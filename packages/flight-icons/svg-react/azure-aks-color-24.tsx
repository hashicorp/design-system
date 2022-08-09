import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureAksColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#azure-aks-color-24__paint0_linear_2372_167)"
                    d="M8.444 3l-3.177.589v4.333l3.177.678 3.19-1.278V4.09L8.443 3z"
                />
                <path
                    fill="#341A6E"
                    d="M5.267 3.589v4.333l3.21.678V3.044l-3.21.545zm1.355 4l-.9-.178V4.078l.9-.145V7.59zm1.4.255L6.99 7.678V3.867l1.033-.178v4.155z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint1_linear_2372_167)"
                    d="M15.322 3.056l-3.177.588v4.334l3.177.678 3.178-1.29V4.145l-3.178-1.088z"
                />
                <path
                    fill="#341A6E"
                    d="M12.145 3.644v4.334l3.188.678V3.1l-3.188.544zm1.344 4l-.9-.177V4.133l.9-.144v3.655zm1.4.256l-1.033-.167v-3.81l1.033-.19V7.9z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint2_linear_2372_167)"
                    d="M5.189 8.978l-3.178.589V13.9l3.178.678L8.378 13.3v-3.233l-3.189-1.09z"
                />
                <path
                    fill="#341A6E"
                    d="M2 9.567v4.3l3.211.677V8.99L2 9.567zm1.344 4.01l-.9-.188v-3.333l.9-.156v3.678zm1.412.29L3.722 13.7V9.844l1.034-.177v4.2z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint3_linear_2372_167)"
                    d="M12.044 8.933l-3.177.59v4.333l3.177.688 3.178-1.288v-3.234l-3.178-1.089z"
                />
                <path
                    fill="#341A6E"
                    d="M8.867 9.522v4.345l3.2.677V8.99l-3.2.533zm1.344 4.011l-.9-.189v-3.333l.9-.155v3.677zm1.4.245l-1.033-.167V9.8l1.033-.178v4.156z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint4_linear_2372_167)"
                    d="M18.9 8.989l-3.178.589v4.333l3.178.678 3.189-1.278v-3.233l-3.19-1.09z"
                />
                <path
                    fill="#341A6E"
                    d="M15.722 9.578v4.289l3.211.677V8.99l-3.21.589zm1.356 4.01l-.9-.188v-3.333l.9-.156v3.678zm1.4.245l-1.034-.166V9.856l1.034-.178v4.155z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint5_linear_2372_167)"
                    d="M8.367 15.022l-3.178.578v4.333l3.178.69 3.189-1.29v-3.222l-3.19-1.089z"
                />
                <path
                    fill="#341A6E"
                    d="M5.189 15.6v4.333l3.211.69v-5.645L5.19 15.6zm1.356 4.011l-.9-.189V16.09l.9-.156v3.678zm1.4.256L6.91 19.7v-3.822l1.034-.178v4.167z"
                />
                <path
                    fill="url(#azure-aks-color-24__paint6_linear_2372_167)"
                    d="M15.233 15.067l-3.177.588v4.334l3.177.678 3.19-1.278v-3.233l-3.19-1.09z"
                />
                <path
                    fill="#341A6E"
                    d="M12.056 15.655v4.334l3.21.678V15.11l-3.21.544zm1.355 4.012l-.9-.19v-3.333l.9-.155v3.678zm1.4.244l-1.033-.167v-3.81l1.033-.178v4.155z"
                />
                <defs>
                    <linearGradient
                        id="azure-aks-color-24__paint0_linear_2372_167"
                        x1={5.267}
                        x2={11.633}
                        y1={5.8}
                        y2={5.8}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint1_linear_2372_167"
                        x1={12.145}
                        x2={18.5}
                        y1={5.856}
                        y2={5.856}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint2_linear_2372_167"
                        x1={2.011}
                        x2={8.367}
                        y1={11.778}
                        y2={11.778}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint3_linear_2372_167"
                        x1={8.867}
                        x2={15.222}
                        y1={11.733}
                        y2={11.733}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint4_linear_2372_167"
                        x1={15.722}
                        x2={22.089}
                        y1={11.789}
                        y2={11.789}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint5_linear_2372_167"
                        x1={5.189}
                        x2={11.556}
                        y1={17.822}
                        y2={17.822}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-24__paint6_linear_2372_167"
                        x1={12.056}
                        x2={18.422}
                        y1={17.867}
                        y2={17.867}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
