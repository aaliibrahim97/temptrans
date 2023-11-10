import { AtlpConfig } from 'projects/@atlp/types';

/**
 * Default Atlp Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const atlpConfig: AtlpConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-atlp',
    customScrollbars: true,
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            primaryBackground: 'atlp-navy-100',
            secondaryBackground: 'atlp-navy-A700',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-1'
        },
        toolbar: {
            customBackgroundColor: true,
            background: 'atlp-bg-white',
            hidden: false,
            position: 'below-static'
        },
        footer: {
            customBackgroundColor: true,
            background: 'atlp-navy-900',
            hidden: true,
            position: 'below-fixed'
        },
        sidepanel: {
            hidden: true,
            position: 'right'
        }
    },
    superimposed: {
        // class add sidebar where superimposed = true
        class: 'sidebar-index'
    }
};
