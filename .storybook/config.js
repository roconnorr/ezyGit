import { configure } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';

configure(require.context('../src/stories', true, /\.stories\.tsx$/), module);
