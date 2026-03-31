/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

export interface InfrastructureResource {
  resource_id: string;
  status: 'active' | 'pending' | 'failing' | 'establishing';
  namespace: string;
  provider_name: 'aws' | 'gcp' | 'azure' | 'kubernetes';
  created_at: Date;
  last_run_time: Date;
  lease_duration: string;
  workspace: string;
  datacenter: string;
  job_spec_version: number;
  attached_policies: string[];
  target_endpoint: string;
  audit_device_path: string;
  tags: string[];
  icon: HdsIconSignature['Args']['name'];
}

const infrastructureResources: InfrastructureResource[] = [
  {
    resource_id: 'd9b1a2c3-f4e5-6a7b-8c9d-0e1f2a3b4c5d',
    status: 'active',
    namespace: 'admin/secrets',
    provider_name: 'aws',
    created_at: new Date('2025-08-15T14:30:00Z'),
    last_run_time: new Date('2025-09-10T11:55:12Z'),
    lease_duration: '720h',
    workspace: 'prod-us-east-1',
    datacenter: 'us-east-1',
    job_spec_version: 2,
    attached_policies: ['root-access', 'audit-writer'],
    target_endpoint: 'pki_int.vault.internal:8200',
    audit_device_path: '/var/log/vault_audit.log',
    tags: ['pki', 'production', 'vault'],
    icon: 'vault-color',
  },
  {
    resource_id: 'e8c2b3d4-a5f6-7b8c-9d0e-1f2a3b4c5d6e',
    status: 'establishing',
    namespace: 'default',
    provider_name: 'azure',
    created_at: new Date('2025-09-01T10:00:00Z'),
    last_run_time: new Date('2025-09-01T10:05:30Z'),
    lease_duration: 'N/A',
    workspace: 'dev-network-staging',
    datacenter: 'eastus2',
    job_spec_version: 5,
    attached_policies: ['network-contributor'],
    target_endpoint: 'resource-group:rg-dev-net',
    audit_device_path: 'N/A',
    tags: ['networking', 'terraform-cloud'],
    icon: 'terraform-color',
  },
  {
    resource_id: 'f7d3c4e5-b6a7-8c9d-0e1f-2a3b4c5d6e7f',
    status: 'active',
    namespace: 'api-gateway',
    provider_name: 'gcp',
    created_at: new Date('2025-07-20T08:00:00Z'),
    last_run_time: new Date('2025-09-10T12:30:00Z'),
    lease_duration: '24h',
    workspace: 'prod-api',
    datacenter: 'us-central1-a',
    job_spec_version: 8,
    attached_policies: ['service-reader'],
    target_endpoint: 'payments-api.service.consul',
    audit_device_path: '/var/log/consul_audit.log',
    tags: ['api', 'service-mesh', 'consul'],
    icon: 'consul-color',
  },
  {
    resource_id: 'a6e4d5f6-c7b8-9d0e-1f2a-3b4c5d6e7f8a',
    status: 'failing',
    namespace: 'batch-processing',
    provider_name: 'kubernetes',
    created_at: new Date('2025-09-09T18:00:00Z'),
    last_run_time: new Date('2025-09-09T18:15:00Z'),
    lease_duration: '1h',
    workspace: 'analytics-jobs',
    datacenter: 'on-prem-dc1',
    job_spec_version: 12,
    attached_policies: ['job-runner', 'logs-reader'],
    target_endpoint: 'task:redis-cache',
    audit_device_path: 'N/A',
    tags: ['batch', 'analytics', 'nomad'],
    icon: 'nomad-color',
  },
  {
    resource_id: 'b5f5e6a7-d8c9-0e1f-2a3b-4c5d6e7f8a9b',
    status: 'active',
    namespace: 'ssh-targets',
    provider_name: 'aws',
    created_at: new Date('2025-06-01T00:00:00Z'),
    last_run_time: new Date('2025-09-10T09:45:21Z'),
    lease_duration: '8h',
    workspace: 'corp-ssh-access',
    datacenter: 'us-west-2',
    job_spec_version: 1,
    attached_policies: ['dba-access-prod'],
    target_endpoint: 'tcp://db-prod-1.rds.amazonaws.com:5432',
    audit_device_path: '/var/log/boundary_session.log',
    tags: ['database', 'ssh', 'rds', 'boundary'],
    icon: 'boundary-color',
  },
  {
    resource_id: 'c4a6f7b8-e9d0-1f2a-3b4c-5d6e7f8a9b0c',
    status: 'pending',
    namespace: 'web-app',
    provider_name: 'gcp',
    created_at: new Date('2025-09-10T12:51:00Z'),
    last_run_time: new Date('2025-09-10T12:51:00Z'),
    lease_duration: 'N/A',
    workspace: 'webapp-staging',
    datacenter: 'us-west1-b',
    job_spec_version: 3,
    attached_policies: ['deployer-role'],
    target_endpoint: 'cloud-run:frontend-staging-app',
    audit_device_path: 'N/A',
    tags: ['frontend', 'waypoint', 'cicd'],
    icon: 'waypoint-color',
  },
];

export default infrastructureResources;
