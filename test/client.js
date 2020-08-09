import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../src/components/App';

const mockImageData = [
  '07ff9e5c-fd23-4b56-8fad-e3192c87d229.jpg',
  '07ff9e5c-fd23-4b56-8fad-e3192c87d230.jpg',
  '07ff9e5c-fd23-4b56-8fad-e3192c87d231.jpg',
  '07ff9e5c-fd23-4b56-8fad-e3192c87d232.jpg',
  '07ff9e5c-fd23-4b56-8fad-e3192c87d233.jpg'
];

describe('Client', () => {
  it('renders the client without errors', () => {
    const renderSpy = sinon.spy(ReactDOM, 'hydrate');
    require('../src/client');

    sinon.assert.calledOnce(renderSpy);
  });

  describe.only('Page layout', () => {
    let renderedApp;

    beforeEach(() => {
      renderedApp = shallow(<App imageData={mockImageData} />);
    });

    it('renders the logo with a hidden h1', () => {
      const header = renderedApp.find('header');
      assert(header.find('h1.hidden'));
      assert(header.find('img'));
      assert.strictEqual(header.text(), 'Pet or Pest?');
    });

    it('renders a container with an initial image', () => {
      const animal = renderedApp.find('.animal');
      assert(animal);
      assert(animal.prop('src').includes('.jpg'));
    });

    it('renders Pet and Pest button arrows', () => {
      const arrow = renderedApp.find('button.arrow');
      assert.strictEqual(arrow.length, 2);
      assert.strictEqual(arrow.find('.arrow--pest').text(), 'Pest');
      assert.strictEqual(arrow.find('.arrow--pet').text(), 'Pet');
    });

    it('renders a footer', () => {
      const footer = renderedApp.find('footer');
      assert.strictEqual(
        footer.text(),
        'Pet or Pest? Made by D Goomani and Aimee Rivers'
      );
    });

    it('displays the first image in the image data from the passed in imageData prop', () => {
      const animal = renderedApp.find('.animal');
      const expectedFileName = mockImageData[0];
      assert(animal.prop('src').includes(expectedFileName));
    });

    it('does not display the results div on initial load', () => {
      const result = renderedApp.find('.result');
      assert.strictEqual(result.length, 0);
    });

    it('displays the previous image below the current image when a choice has been made by the user', () => {
      const currentAnimal = renderedApp.find('.animal').prop('src');
      const petArrow = renderedApp.find('button.arrow--pet');
      petArrow.simulate('click', { target: { getAttribute: () => 'pet' } });
      let result = renderedApp.find('.result');
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result.find('.result__image').prop('src'),
        currentAnimal
      );
      assert.strictEqual(result.find('.result__text').text(), 'you said pet');

      const pestArrow = renderedApp.find('button.arrow--pest');
      pestArrow.simulate('click', { target: { getAttribute: () => 'pest' } });
      result = renderedApp.find('.result');
      assert.strictEqual(result.find('.result__text').text(), 'you said pest');
    });

    it('refreshes the current image once a choice has been made by the user', () => {
      const currentAnimal = renderedApp.find('.animal').prop('src');
      const petArrow = renderedApp.find('button.arrow--pet');
      petArrow.simulate('click', { target: { getAttribute: () => 'pet' } });

      const newCurrentAnimal = renderedApp.find('.animal').prop('src');

      assert.notStrictEqual(currentAnimal, newCurrentAnimal);
    });

    it.skip('never loads the same image twice in a row');
  });
});
