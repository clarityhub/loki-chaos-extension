import React from 'react';
import { func, object } from 'prop-types';

import RoutineSection from './RoutineSection';

const preventDefault = (event) => {
  event.preventDefault();
};

const RoutineForm = ({ onFormChanged, routines, settings }) => (
  <form id="routines" onSubmit={preventDefault}>
    {Object.keys(routines).map((key, i) => {
      const value = routines[key];

      return (
        <RoutineSection
          onFormChanged={onFormChanged}
          routine={{
            key,
            ...value,
          }}
          settings={settings}
          key={i}
        />
      );
    })}
  </form>
);

RoutineForm.propTypes = {
  onFormChanged: func.isRequired,
  routines: object.isRequired,
  settings: object.isRequired,
};

export default RoutineForm;
