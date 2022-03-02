import * as React from 'react';
import { Onboarding, Type } from 'react-figma-ui';

type StatusReadyToRun = {
    type: 'ready-to-run';
};

type StatusCurrentlyRunning = {
    type: 'currently-running';
};

type StatusHasRunSuccessfully = {
    type: 'has-run-successfully';
};

type StatusHasRunWithError = {
    type: 'has-run-with-error';
    message?: string;
};

export type Status = StatusReadyToRun | StatusCurrentlyRunning | StatusHasRunSuccessfully | StatusHasRunWithError;

export function StatusDisplay({ status }: { status: Status }) {
    switch (status.type) {
        case 'ready-to-run':
            return (
                <Onboarding iconProps={{ iconName: 'play' }}>
                    <Type size="small">Ready to run</Type>
                </Onboarding>
            );
        case 'currently-running':
            return (
                <Onboarding iconProps={{ iconName: 'timer' }}>
                    <Type size="small">Running process</Type>
                </Onboarding>
            );
        case 'has-run-successfully':
            return (
                <Onboarding iconProps={{ iconName: 'resolve' }}>
                    <Type size="small" className="text-green-600">
                        Process run successfully
                    </Type>
                </Onboarding>
            );
        case 'has-run-with-error':
            return (
                <Onboarding iconProps={{ iconName: 'warning-large', colorName: 'red' }}>
                    <Type size="small" className="text-red-600">
                        <span>Process failed</span>
                        {status.message && ` (${status.type})`}
                    </Type>
                    <Type size="small" className="text-gray-800">
                        For more details on the error, please check the logs.
                    </Type>
                </Onboarding>
            );
    }
}
