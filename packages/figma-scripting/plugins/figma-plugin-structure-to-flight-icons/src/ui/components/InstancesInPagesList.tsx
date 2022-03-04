import * as React from 'react';

import { InstancesFoundInAllPages, InstancesFoundInPage, InstanceData } from '../../types/types';

import { Button, Disclosure, DisclosureTip, Icon, Type } from 'react-figma-ui';

export function InstancesInPagesList({
    instancesFoundInAllPages,
    activeSelectedInstanceID,
    onClickItem,
    onClickReplaceButton,
}: {
    instancesFoundInAllPages: InstancesFoundInAllPages;
    activeSelectedInstanceID: InstanceData['id'];
    onClickItem: Function;
    onClickReplaceButton: Function;
}) {
    if (instancesFoundInAllPages.length > 0) {
        const tips = instancesFoundInAllPages.map((instancesFoundInPage) => {
            return {
                heading: `Page: ${instancesFoundInPage.page.name} (${instancesFoundInPage.instances.length} icons)`,
                content: (
                    <ul>
                        {instancesFoundInPage.instances.map((instance) => {
                            return (
                                <li
                                    key={`${instance.id}`}
                                    className={`flex flex-row items-center ml-4 pl-1 border-b border-dotted border-gray-200 cursor-pointer ${activeSelectedInstanceID === instance.id ? 'bg-blue-100' : ''}`}
                                    onClick={() => {
                                        onClickItem(instancesFoundInPage.page.id, instance.id);
                                    }}
                                >
                                    <div className="flex-0 mr-1" style={{ width: '16px', height: '16px' }}>
                                        <Icon iconName="instance" colorName="black3" className="w-full h-full bg-cover" />
                                    </div>
                                    <Type className="flex-1 p-2 text-blue-500 hover:underline">
                                        {instance.name} (<span>{instance.id}</span>)
                                    </Type>
                                    <Button tint="primary" className="flex-0 mt-10 mr-auto ml-auto" onClick={() => {
                                        onClickReplaceButton(instancesFoundInPage.page.id, instance.id);
                                    }}>
                                        Replace
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                ),
                id: instancesFoundInPage.page.id,
            };
        });

        return <Disclosure tips={tips} render={({ heading, content, id }: any) => <DisclosureTip heading={heading} content={content} key={id} expanded={true} />} />;
    } else {
        return <Type className="p-2 text-gray-500">No instances found</Type>;
    }
}
