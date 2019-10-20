import { configure } from '@storybook/react';
import '@blueprintjs/core/lib/css/blueprint.css';

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
