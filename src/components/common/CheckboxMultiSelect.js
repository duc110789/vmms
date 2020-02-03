import React from 'react';
import makeAnimated from 'react-select/animated';
import { components } from 'react-select';

export const allOption = {
  label: 'Select all',
  value: '*',
};
export default allOption;

export function Option(props) {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        {' '}
        <label>
          {props.label}
        </label>
      </components.Option>
    </div>
  );
}

export function ValueContainer({ children, ...props }) {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some((val) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
}

export function MultiValue(props) {
  let labelToBeDisplayed = `${props.data.label}, `;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = 'All is selected';
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
}

export const animatedComponents = makeAnimated();
