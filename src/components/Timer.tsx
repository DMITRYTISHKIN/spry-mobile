import React, { Component } from 'react';
import { Text } from 'react-native';

interface State {
  value: any;
}

interface Props {
  fn: () => string;
  timeout: number;
  style?: any;
}

export default class Timer extends Component<Props, State> {
  private isUnmounted = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: null
    };
  }

  componentDidMount() {
    const start = () => {
      setTimeout(() => {
        if (this.isUnmounted) {
          return;
        }

        const value = this.props.fn();
        if (value !== this.state.value) {
          this.setState({ value });
        }
        start();
      }, this.props.timeout);
    }
    start();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <Text style={this.props.style}>{ this.state.value }</Text>
    )
  }
}
