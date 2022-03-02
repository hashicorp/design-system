import * as React from 'react';
import * as ReactDom from 'react-dom';

import { InstancesFoundInAllPages, InstanceData } from '../types/types';

import { SectionTitle, Button, Type } from 'react-figma-ui';
import { Status, StatusDisplay } from 'figma-plugin-shared/ui/components/StatusDisplay';

import './ui.scss';

import { InstancesInPagesList } from './components/InstancesInPagesList';

const App = () => {
    const [status, setStatus] = React.useState<Status>({ type: 'ready-to-run' });
    const [instancesFoundInAllPages, setInstancesFoundInAllPages] = React.useState<InstancesFoundInAllPages>([]);
    const [selectedInstanceID, setSelectedInstanceID] = React.useState<InstanceData['id']>('');

    const onFindAllInstances = React.useCallback(() => {
        setStatus({ type: 'currently-running' });
        parent.postMessage({ pluginMessage: { type: 'find-all-instances' } }, '*');
    }, []);

    const onFindInstance = React.useCallback((pageID: string, instanceID: InstanceData['id']) => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'find-instance-by-id',
                    message: {
                        page: {
                            id: pageID,
                        },
                        instance: {
                            id: instanceID,
                        },
                    },
                },
            },
            '*'
        );

        // we don't need to wait for the post response to set the value, we can do it directly here
        setSelectedInstanceID(instanceID);
    }, []);

    const onReplaceInstance = React.useCallback((pageID: string, instanceID: InstanceData['id']) => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'replace-instance-by-id',
                    message: {
                        page: {
                            id: pageID,
                        },
                        instance: {
                            id: instanceID,
                        },
                    },
                },
            },
            '*'
        );

        // we don't need to wait for the post response to set the value, we can do it directly here
        setSelectedInstanceID('');
    }, []);

    React.useEffect(() => {
        // this is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            // notice: when we receive the message from the plugin code to the UI, the data is inside a "pluginMessage" object
            // see: https://www.figma.com/plugin-docs/creating-ui/#sending-a-message-from-the-plugin-code-to-the-ui
            const { type, message } = event.data.pluginMessage;
            // console.log('window.onmessage', JSON.stringify(event.data), type, message);
            if (type === 'find-all-instances') {
                setStatus({ type: 'has-run-successfully' });
                setInstancesFoundInAllPages(message.results);
            }
        };
    }, []);

    if (status.type === 'ready-to-run') {
        return (
            <div className="grid p-4 h-full">
                <div>
                    <SectionTitle>How does it work:</SectionTitle>
                    <div className="ml-2">
                        <ul className="list-disc text-gray-800">
                            <li className="ml-4">
                                <Type size="small">This plugin will find all the instances of Structure icons and create a list..</Type>
                            </li>
                            <li className="ml-4">
                                <Type size="small">When you select an icon from the list, the occurrence will be selected for you.</Type>
                            </li>
                            <li className="ml-4">
                                <Type size="small">At this point you can replace it:</Type>
                                <ul className="list-disc text-gray-800">
                                    <li className="ml-4">
                                        <Type size="small">manually, via the "Swap instance" panel in Figma</Type>
                                    </li>
                                    <li className="ml-4">
                                        <Type size="small">automatically, via the dedicated button <span className="text-gray-600">(under construction)</span></Type>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Button tint="primary" className="flex-0 mt-10 mr-auto ml-auto" onClick={onFindAllInstances}>
                        Start
                    </Button>
                </div>
            </div>
        );
    } else if (status.type === 'has-run-successfully') {
        return (
            <div className="p-4 h-full">
                <div className="grid h-full overflow-hidden" style={{ gridTemplateRows: '32px 1fr' }}>
                    <SectionTitle>Found instances:</SectionTitle>
                    <div className="overflow-auto overscroll-contain">
                        <InstancesInPagesList instancesFoundInAllPages={instancesFoundInAllPages} onClickItem={onFindInstance} onClickReplaceButton={onReplaceInstance} activeSelectedInstanceID={selectedInstanceID} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-4 h-full">
                <SectionTitle>Status:</SectionTitle>
                <div className="ml-2">
                    <StatusDisplay status={status} />
                </div>
            </div>
        );
    }
};

ReactDom.render(<App />, document.getElementById('react-app'));
