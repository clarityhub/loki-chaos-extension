import React, { Component } from 'react';
import { any, arrayOf, func, object, shape, string } from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import styled from 'react-emotion';

import {
  Text,
  Heading,
} from '../Styled';

const Container = styled.div`
  border-top: 1px solid #ebebeb;
  display: flex;
  padding: 16px 8px;
`;

const Left = styled.div`
  width: 300px;
`;

const Right = styled.div`
  flex: 1;
`;

const FormSection = styled.div`
  max-width: 500px;
`;

export default class RoutineSection extends Component {
  static propTypes = {
    onFormChanged: func.isRequired,
    routine: shape({
      key: string.isRequired,
      controls: arrayOf(shape({
        key: string,
        default: any,
      })),
      description: string.isRequired,
      title: string.isRequired,
    }).isRequired,
    settings: object.isRequired,
  }

  renderInput = (control) => {
    const { onFormChanged, routine, settings } = this.props;

    const value = (function () {
      if (typeof settings.routines !== 'undefined' &&
        typeof settings.routines[routine.key] !== 'undefined' &&
        typeof settings.routines[routine.key][control.name] !== 'undefined') {
        return settings.routines[routine.key][control.name];
      } else {
        return control.default;
      }
    })();

    const input = (function () {
      switch (control.type) {
        case 'checkbox':
          return (
            <input
              name={control.name}
              type="checkbox"
              onChange={(e) => onFormChanged(e, routine)}
              checked={value}
            />
          );
        case 'slider':
          return (
            <Slider
              min={control.min * 100 || 0}
              max={control.max * 100 || 100}
              step={control.step * 100 || 10}
              name={control.name}
              onChange={(e, value) => {
                e.target.name = control.name;
                onFormChanged(e, routine, { value: value / 100 });
              }}
              value={Math.round(value * 100)}
            />
          );
        default:
          return (
            <input
              name={control.name}
              onChange={(e) => onFormChanged(e, routine)}
              value={value}
            />
          );
      }
    })();

    return (
      <label>
        {input}
        <span>{control.name}</span>
      </label>
    );
  }

  render() {
    const { routine } = this.props;
    return (
      <Container>
        <Left>
          <Heading>{routine.title}</Heading>
          <Text>{routine.description}</Text>
        </Left>
        <Right>
          {routine.controls.map((control, i) => (
            <FormSection key={i}>
              {this.renderInput(control)}
            </FormSection>
          ))}
        </Right>

      </Container>
    );
  }
}
