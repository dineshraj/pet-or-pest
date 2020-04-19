require('@babel/register')({
  ignore: [/node_modules/],
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts'],
  cache: false
});

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const dom = new JSDOM(
  '<!doctype html><html><body><div id="pet-or-pest"></div></body></html>'
);

global.window = dom.window;
global.document = dom.window.document;
global.navigator = {};
