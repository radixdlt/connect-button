import { LitElement } from 'lit';
import './loading-spinner';
export declare class ConnectButton extends LitElement {
    connected: boolean;
    loading: boolean;
    get buttonText(): "Connected" | "Connect";
    disconnectedCallback(): void;
    private onClick;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'connect-button': ConnectButton;
    }
}
