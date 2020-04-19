import sinon from 'sinon';
import ReactDOM from 'react-dom';

describe('Client', () => {
  it('renders the client without errors', () => {
    const renderSpy = sinon.spy(ReactDOM, 'hydrate');
    require('../src/client');

    sinon.assert.calledOnce(renderSpy);
  });
});
