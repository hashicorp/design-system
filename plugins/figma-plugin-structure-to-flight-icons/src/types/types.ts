export type InstanceData = {
    id: string;
    name: string;
    mainComponent: {
        id: string;
        key: string;
        name: string;
    };
};

export type InstancesFoundInPage = {
    page: {
        id: string;
        name: string;
    };
    instances: InstanceData[];
};

export type InstancesFoundInAllPages = InstancesFoundInPage[];
