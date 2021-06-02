import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SprkTextareaContainer from './SprkTextareaContainer';
import SprkLabel from '../SprkLabel/SprkLabel';
import SprkTextarea from '../SprkTextarea/SprkTextarea';
import SprkErrorContainer from '../SprkErrorContainer/SprkErrorContainer';
import SprkFieldError from '../SprkFieldError/SprkFieldError';
import SprkHelperText from '../SprkHelperText/SprkHelperText';

Enzyme.configure({ adapter: new Adapter() });

describe('SprkTextareaContainer Class Tests:', () => {
  it('should render an element with the correct class', () => {
    const wrapper = mount(<SprkTextareaContainer />);
    expect(wrapper.find('.sprk-b-InputContainer').length).toBe(1);
    expect(
      wrapper.find('.sprk-b-InputContainer').getDOMNode().classList.length,
    ).toBe(1);
  });

  it('should add classes when additionalClasses has a value', () => {
    const wrapper = mount(
      <SprkTextareaContainer additionalClasses="sprk-u-man" />,
    );
    expect(wrapper.find('.sprk-b-InputContainer.sprk-u-man').length).toBe(1);
    expect(
      wrapper.find('.sprk-b-InputContainer').getDOMNode().classList.length,
    ).toBe(2);
  });
});

describe('SprkTextareaContainer Data Attribute Tests:', () => {
  it('should assign data-analytics when analyticsString has a value', () => {
    const wrapper = mount(<SprkTextareaContainer analyticsString="321" />);
    expect(wrapper.find('[data-analytics="321"]').length).toBe(1);
  });

  it(`should not render data-analytics when
  analyticsString is not present`, () => {
    const wrapper = mount(<SprkTextareaContainer />);
    expect(wrapper.find('[data-analytics]').length).toBe(0);
  });

  it('should assign data-id when idString has a value', () => {
    const wrapper = mount(<SprkTextareaContainer idString="321" />);
    expect(wrapper.find('[data-id="321"]').length).toBe(1);
  });

  it('should not render data-id when idString is not present', () => {
    const wrapper = mount(<SprkTextareaContainer />);
    expect(wrapper.find('[data-id]').length).toBe(0);
  });
});

describe('SprkTextareaContainer ID/htmlFor Tests:', () => {
  it(`should set for value of label to match
  textarea id if mismatching`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel htmlFor="testFor">Mismatching Values</SprkLabel>
        <SprkTextarea id="testID" />
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe('testID');
  });

  it(`should set for value of label to match
  textarea id if it is missing`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>With custom for</SprkLabel>
        <SprkTextarea id="testID" />
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe('testID');
  });

  it(`should set the for value of the label to be
  the default ID of the textarea`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel htmlFor="testFor">Textarea has default ID</SprkLabel>
        <SprkTextarea />
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe(
      wrapper.find('textarea').getDOMNode().id,
    );
  });

  it(`should set for value of label to match
  textarea id if both missing`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea has default ID</SprkLabel>
        <SprkTextarea />
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe(
      wrapper.find('textarea').getDOMNode().id,
    );
  });

  it('should not update for or id if they are matching', () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel htmlFor="match">htmlFor and id Match</SprkLabel>
        <SprkTextarea id="match" />
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('textarea').getDOMNode().id).toBe('match');
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe('match');
  });
});

describe('SprkTextareaContainer aria-describedby Tests:', () => {
  it(`should add the helperTextID to the aria-describedby
  on the textarea if it isn't present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
        <SprkHelperText id="test-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the errorContainerID to the aria-describedby
  on the textarea if it isn't present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
        <SprkErrorContainer id="test-id" message="test message" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the fieldErrorID to the aria-describedby
  on the textarea if it isn't present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
        <SprkFieldError id="test-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should allow additional values be passed to the aria-describedby`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="additional-value" />
        <SprkFieldError id="test-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-id');
  });

  it(`should add helperTextID and fieldErrorID to the
  aria-describedby if neither are present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the
  aria-describedby if neither are present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and fieldErrorID to the
  aria-describedby if neither are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="additional-value" />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the
  aria-describedby if neither are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="additional-value" />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and errorContainerID to the
  aria-describedby if both are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="value test-helper-id test-error-id" />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and fieldErrorID to the
  aria-describedby if both are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="value test-helper-id test-error-id" />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="test-helper-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id');
  });

  it(`should not add errorContainerID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="test-id" />
        <SprkErrorContainer message="test message" id="test-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add fieldErrorID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea ariaDescribedBy="test-id" />
        <SprkFieldError id="test-id" />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add aria-describedby to the textarea
  if there is no helper or error text`, () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel>Textarea Label</SprkLabel>
        <SprkTextarea />
      </SprkTextareaContainer>,
    );

    expect(
      wrapper.find('textarea').getDOMNode().getAttribute('aria-describedby'),
    ).toBe(null);
  });
});
describe('SprkTextareaContainer Additional Elements Tests:', () => {
  it('should allow other elements to be passed through', () => {
    const wrapper = mount(
      <SprkTextareaContainer>
        <SprkLabel htmlFor="testFor">Mismatching Values</SprkLabel>
        <SprkTextarea id="testID" />
        <p>Additional Information Passed</p>
      </SprkTextareaContainer>,
    );
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should pass through additional attributes', () => {
    const wrapper = shallow(<SprkTextareaContainer data-my-attr="testing" />);
    expect(wrapper.find('[data-my-attr="testing"]').length).toBe(1);
  });
});