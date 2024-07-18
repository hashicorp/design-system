/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { SafeString } from '@ember/template/-private/handlebars';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsAppFooterStatusTypes } from './types.ts';
import type { HdsAppFooterLinkSignature } from './link.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const STATUSES: Record<import("./types.ts").HdsAppFooterStatusValues, {
    text: string;
    iconName: "type" | "map" | "filter" | "code" | "link" | "menu" | "search" | "video" | "circle" | "image" | "path" | "tag" | "repeat" | "hash" | "target" | "change" | "pause" | "play" | "loading" | "loading-static" | "running" | "running-static" | "apple" | "apple-color" | "alibaba" | "alibaba-color" | "amazon-ecs" | "amazon-ecs-color" | "amazon-eks" | "amazon-eks-color" | "auth0" | "auth0-color" | "aws" | "aws-color" | "aws-cdk" | "aws-cdk-color" | "aws-cloudwatch" | "aws-cloudwatch-color" | "aws-ec2" | "aws-ec2-color" | "aws-lambda" | "aws-lambda-color" | "aws-s3" | "aws-s3-color" | "azure" | "azure-color" | "azure-aks" | "azure-aks-color" | "azure-blob-storage" | "azure-blob-storage-color" | "azure-devops" | "azure-devops-color" | "azure-vms" | "azure-vms-color" | "bitbucket" | "bitbucket-color" | "bridgecrew" | "bridgecrew-color" | "cisco" | "cisco-color" | "codepen" | "codepen-color" | "datadog" | "datadog-color" | "digital-ocean" | "digital-ocean-color" | "docker" | "docker-color" | "elastic-observability" | "elastic-observability-color" | "f5" | "f5-color" | "facebook" | "facebook-color" | "figma" | "figma-color" | "gcp" | "gcp-color" | "git" | "git-color" | "gitlab" | "gitlab-color" | "github" | "github-color" | "google" | "google-color" | "google-docs" | "google-docs-color" | "google-drive" | "google-drive-color" | "google-forms" | "google-forms-color" | "google-sheets" | "google-sheets-color" | "google-slides" | "google-slides-color" | "grafana" | "grafana-color" | "helm" | "helm-color" | "infracost" | "infracost-color" | "jfrog" | "jfrog-color" | "jira" | "jira-color" | "jwt" | "jwt-color" | "kubernetes" | "kubernetes-color" | "lightlytics" | "lightlytics-color" | "linkedin" | "linkedin-color" | "linode" | "linode-color" | "linux" | "linux-color" | "loom" | "loom-color" | "meetup" | "meetup-color" | "microsoft" | "microsoft-color" | "microsoft-teams" | "microsoft-teams-color" | "minio" | "minio-color" | "new-relic" | "new-relic-color" | "okta" | "okta-color" | "oracle" | "oracle-color" | "opa" | "opa-color" | "openid" | "openid-color" | "pack" | "pack-color" | "pager-duty" | "pager-duty-color" | "rabbitmq" | "rabbitmq-color" | "saml" | "saml-color" | "service-now" | "service-now-color" | "slack" | "slack-color" | "snyk" | "snyk-color" | "splunk" | "splunk-color" | "twitch" | "twitch-color" | "twitter" | "twitter-color" | "twitter-x" | "twitter-x-color" | "vantage" | "vantage-color" | "venafi" | "venafi-color" | "vercel" | "vercel-color" | "vmware" | "vmware-color" | "youtube" | "youtube-color" | "boundary" | "boundary-color" | "boundary-fill" | "boundary-fill-color" | "boundary-square" | "boundary-square-color" | "consul" | "consul-color" | "consul-fill" | "consul-fill-color" | "consul-square" | "consul-square-color" | "nomad" | "nomad-color" | "nomad-fill" | "nomad-fill-color" | "nomad-square" | "nomad-square-color" | "packer" | "packer-color" | "packer-fill" | "packer-fill-color" | "packer-square" | "packer-square-color" | "terraform" | "terraform-color" | "terraform-fill" | "terraform-fill-color" | "terraform-square" | "terraform-square-color" | "vagrant" | "vagrant-color" | "vagrant-fill" | "vagrant-fill-color" | "vagrant-square" | "vagrant-square-color" | "vault" | "vault-color" | "vault-fill" | "vault-fill-color" | "vault-square" | "vault-square-color" | "vault-radar" | "vault-radar-color" | "vault-radar-fill" | "vault-radar-fill-color" | "vault-radar-square" | "vault-radar-square-color" | "vault-secrets" | "vault-secrets-color" | "vault-secrets-fill" | "vault-secrets-fill-color" | "vault-secrets-square" | "vault-secrets-square-color" | "waypoint" | "waypoint-color" | "waypoint-fill" | "waypoint-fill-color" | "waypoint-square" | "waypoint-square-color" | "hashicorp" | "hashicorp-color" | "hashicorp-fill" | "hashicorp-fill-color" | "hashicorp-square" | "hashicorp-square-color" | "hcp" | "hcp-color" | "hcp-fill" | "hcp-fill-color" | "hcp-square" | "hcp-square-color" | "arrow-down" | "arrow-down-circle" | "arrow-down-left" | "arrow-down-right" | "arrow-left" | "arrow-left-circle" | "arrow-right" | "arrow-right-circle" | "arrow-up" | "arrow-up-circle" | "arrow-up-left" | "arrow-up-right" | "caret" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "chevrons-down" | "chevrons-left" | "chevrons-right" | "chevrons-up" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "load-balancer" | "migrate" | "move" | "shuffle" | "swap-horizontal" | "swap-vertical" | "bank-vault" | "briefcase" | "credit-card" | "dollar-sign" | "enterprise" | "globe" | "globe-private" | "org" | "provider" | "shopping-bag" | "shopping-cart" | "activity" | "at-sign" | "award" | "bell" | "bell-active" | "bell-active-fill" | "bell-off" | "discussion-circle" | "discussion-square" | "heart" | "heart-fill" | "heart-off" | "mail" | "mail-open" | "message-circle" | "message-circle-fill" | "message-square" | "message-square-fill" | "mic" | "mic-off" | "newspaper" | "phone" | "phone-call" | "phone-off" | "send" | "star" | "star-circle" | "star-fill" | "star-off" | "thumbs-down" | "thumbs-up" | "video-off" | "bar-chart" | "bar-chart-alt" | "box" | "collections" | "database" | "hard-drive" | "line-chart" | "line-chart-up" | "logs" | "package" | "pie-chart" | "queue" | "save" | "trend-down" | "trend-up" | "calendar" | "clock" | "clock-filled" | "delay" | "event" | "history" | "hourglass" | "watch" | "api" | "auto-apply" | "build" | "change-circle" | "change-square" | "channel" | "cloud" | "cloud-check" | "cloud-download" | "cloud-lightning" | "cloud-lock" | "cloud-off" | "cloud-upload" | "cloud-x" | "connection" | "connection-gateway" | "cpu" | "duplicate" | "gateway" | "git-branch" | "git-commit" | "git-merge" | "git-pull-request" | "git-repo" | "hammer" | "key-values" | "mainframe" | "mesh" | "module" | "monitor" | "network" | "network-alt" | "node" | "pipeline" | "plug" | "replication-direct" | "replication-perf" | "scissors" | "server" | "server-cluster" | "serverless" | "service" | "settings" | "sliders" | "smartphone" | "socket" | "step" | "tablet" | "terminal" | "terminal-screen" | "test" | "tools" | "transform-data" | "tv" | "webhook" | "wrench" | "archive" | "clipboard" | "clipboard-checked" | "clipboard-copy" | "clipboard-x" | "file" | "file-change" | "file-check" | "file-diff" | "file-minus" | "file-plus" | "file-source" | "file-text" | "file-x" | "files" | "folder" | "folder-fill" | "folder-minus" | "folder-minus-fill" | "folder-plus" | "folder-plus-fill" | "folder-star" | "inbox" | "align-center" | "align-justify" | "align-left" | "align-right" | "battery" | "battery-charging" | "bookmark" | "bookmark-add" | "bookmark-add-fill" | "bookmark-fill" | "bookmark-remove" | "bookmark-remove-fill" | "bottom" | "command" | "crop" | "dashboard" | "delete" | "download" | "edit" | "entry-point" | "exit-point" | "external-link" | "filter-circle" | "filter-fill" | "grid" | "grid-alt" | "home" | "jump-link" | "layout" | "list" | "maximize" | "maximize-alt" | "minimize" | "minimize-alt" | "more-horizontal" | "more-vertical" | "mouse-pointer" | "paperclip" | "pen-tool" | "pencil-tool" | "pin" | "power" | "printer" | "reload" | "rotate-cw" | "rotate-ccw" | "share" | "sidebar" | "sidebar-hide" | "sidebar-show" | "sign-in" | "sign-out" | "slash" | "slash-square" | "sort-asc" | "sort-desc" | "switcher" | "sync" | "sync-alert" | "sync-reverse" | "toggle-left" | "toggle-right" | "top" | "trash" | "unfold-close" | "unfold-open" | "upload" | "zoom-in" | "zoom-out" | "compass" | "crosshair" | "map-pin" | "navigation" | "navigation-alt" | "redirect" | "camera" | "camera-off" | "cast" | "closed-caption" | "fast-forward" | "film" | "headphones" | "music" | "pause-circle" | "play-circle" | "radio" | "rewind" | "rss" | "skip-back" | "skip-forward" | "speaker" | "stop-circle" | "volume" | "volume-down" | "volume-2" | "volume-x" | "wifi" | "wifi-off" | "ampersand" | "beaker" | "bulb" | "circle-dot" | "circle-fill" | "circle-half" | "diamond" | "diamond-fill" | "disc" | "dot" | "dot-half" | "droplet" | "flag" | "gift" | "government" | "handshake" | "hexagon" | "hexagon-fill" | "labyrinth" | "layers" | "moon" | "octagon" | "outline" | "random" | "rocket" | "sparkle" | "square" | "square-fill" | "sun" | "triangle" | "triangle-fill" | "truck" | "wand" | "zap" | "zap-off" | "minus" | "minus-circle" | "minus-circle-fill" | "minus-plus" | "minus-plus-circle" | "minus-plus-square" | "minus-square" | "minus-square-fill" | "plus" | "plus-circle" | "plus-circle-fill" | "plus-square" | "bug" | "certificate" | "eye" | "eye-off" | "fingerprint" | "key" | "keychain" | "lock" | "lock-fill" | "lock-off" | "shield" | "shield-alert" | "shield-check" | "shield-off" | "shield-x" | "token" | "unlock" | "verified" | "wall" | "alert-circle" | "alert-circle-fill" | "alert-diamond" | "alert-diamond-fill" | "alert-octagon" | "alert-octagon-fill" | "alert-triangle" | "alert-triangle-fill" | "check" | "check-circle" | "check-circle-fill" | "check-diamond" | "check-diamond-fill" | "check-hexagon" | "check-hexagon-fill" | "check-square" | "check-square-fill" | "skip" | "x" | "x-circle" | "x-circle-fill" | "x-diamond" | "x-diamond-fill" | "x-hexagon" | "x-hexagon-fill" | "x-square" | "x-square-fill" | "docs" | "docs-download" | "docs-link" | "guide" | "guide-link" | "help" | "info" | "info-fill" | "learn" | "learn-link" | "support" | "accessibility" | "folder-users" | "frown" | "identity-service" | "identity-user" | "meh" | "robot" | "smile" | "user" | "user-check" | "user-circle" | "user-circle-fill" | "user-minus" | "user-plus" | "user-x" | "users" | undefined;
}>;
export interface HdsAppFooterStatusLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        itemStyle?: SafeString;
        status?: HdsAppFooterStatusTypes;
        statusIcon?: FlightIconSignature['Args']['name'];
        statusIconColor?: string;
        text?: string;
    };
    Element: HdsAppFooterLinkSignature['Element'];
}
export default class HdsAppFooterStatusLinkComponent extends Component<HdsAppFooterStatusLinkSignature> {
    constructor(owner: unknown, args: HdsInteractiveSignature['Args']);
    /**
     * @param status
     * @type {HdsAppFooterStatusTypes}
     * @description The name of the status which the StatusLink is being set to
     */
    get status(): HdsAppFooterStatusTypes | undefined;
    /**
     * @param statusIcon
     * @type {string}
     * @description The name for the StatusLink icon
     */
    get statusIcon(): FlightIconSignature['Args']['name'];
    /**
     * Get the inline style to apply to the item.
     * @method StatusLink#itemStyle
     * @return {string} The "style" attribute to apply to the item.
     */
    get itemStyle(): SafeString | undefined;
    /**
     * @param text
     * @type {string}
     * @description The text content of the StatusLink
     */
    get text(): string | undefined;
    /**
     * @param href
     * @type {string}
     * @description The href value of the StatusLink
     */
    get href(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=status-link.d.ts.map