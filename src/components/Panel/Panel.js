import React, { Component } from 'react';
import { func, object, oneOf, string } from 'prop-types';
import styled from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import {
  Text,
  Button,
  Heading,
} from '../Styled';
import RoutineForm from '../RoutineForm';

const Container = styled.div`
  color: ${props => props.theme.fontColor};
  font-family: Roboto, sans-serif;
  padding: 16px;
`;

const Header = styled.div`
  display: block;
`;

const Toolbar = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
`;

export default class Panel extends Component {
  static propTypes = {
    onFormChanged: func.isRequired,
    onInject: func.isRequired,
    onInjectOnLoad: func.isRequired,
    onRemoveInjectOnLoad: func.isRequired,
    origin: string.isRequired,
    routines: object.isRequired,
    settings: object.isRequired,
    theme: oneOf(['default', 'dark']).isRequired,
  }

  constructor(props) {
    super(props);

    const { origin, settings } = props;

    let injectOnLoad = false;

    if (settings && settings.autoInject) {
      if (settings.autoInject.indexOf(origin) !== -1) {
        injectOnLoad = true;
      }
    }

    this.state = {
      injectOnLoad,
      settings,
    };
  }

  handleInject = (e) => {
    e.preventDefault();

    this.props.onInject();
  }

  handleInjectOnLoad = () => {
    const {
      onRemoveInjectOnLoad,
      onInjectOnLoad,
      origin,
    } = this.props;
    const { injectOnLoad, settings } = this.state;

    this.setState({
      injectOnLoad: !injectOnLoad,
    }, async () => {
      let newSettings = settings;

      if (injectOnLoad) {
        newSettings = await onRemoveInjectOnLoad(origin);
      } else {
        newSettings = await onInjectOnLoad(origin);
      }

      this.setState({
        settings: newSettings,
      });
    });
  }

  handleFormChanged = (event, routine, options = {}) => {
    const { onFormChanged } = this.props;
    const { settings } = this.state;

    const target = event.target;

    const newSettings = {
      ...settings,
    };

    let value = 0;
    if (options && typeof options.value !== 'undefined') {
      value = options.value;
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value;
    }

    // There should be defaults set by background/setup.js though
    newSettings.routines[routine.key][event.target.name] = value;

    this.setState({
      settings: newSettings,
    }, () => {
      onFormChanged(newSettings);
    });
  }

  getTheme = () => {
    const { theme } = this.props;

    if (theme === 'dark') {
      return {
        fontColor: '#FFF',
        fontColorLight: '#EEE',
      };
    } else {
      return {
        fontColor: '#000',
        fontColorLight: 'rgb(117, 117, 117)',
      };
    }
  }

  render() {
    const { routines } = this.props;
    const { injectOnLoad, settings } = this.state;

    const currentTheme = this.getTheme();

    return (
      <ThemeProvider theme={currentTheme}>
        <Container>
          <Header>
            <Heading>
              {process.env.EXT_EXTENSION_NAME}
            </Heading>

            <Text>
              Inject chaos into your webpages by failing promises and psuedo-localizing text.
            </Text>
          </Header>

          <Toolbar>
            <Button onClick={this.handleInject}>
              Inject
            </Button>

            <div>
              <label>
                <input
                  checked={injectOnLoad}
                  name="injectOnLoad"
                  type="checkbox"
                  onChange={this.handleInjectOnLoad}
                />

                <span>Inject on Load</span>
              </label>
            </div>
          </Toolbar>

          <div>
            <RoutineForm
              onFormChanged={this.handleFormChanged}
              routines={routines}
              settings={settings}
            />
          </div>
        </Container>
      </ThemeProvider>
    );
  }
}
