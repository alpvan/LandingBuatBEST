import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    alt?: string;
                    'auto-rotate'?: boolean;
                    'camera-controls'?: boolean;
                    'shadow-intensity'?: string;
                    exposure?: string;
                    'environment-image'?: string;
                    'rotation-per-second'?: string;
                    'field-of-view'?: string;
                    'min-field-of-view'?: string;
                    'max-field-of-view'?: string;
                    'camera-orbit'?: string;
                    'min-camera-orbit'?: string;
                    'max-camera-orbit'?: string;
                    'disable-zoom'?: boolean;
                    'disable-pan'?: boolean;
                    'interaction-prompt'?: string;
                    loading?: string;
                    poster?: string;
                },
                HTMLElement
            >;
        }
    }
}
