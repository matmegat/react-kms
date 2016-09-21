import React, {Component, PropTypes} from 'react';

export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  state = {
    browser: false
  }

  componentWillMount() {
    this.setState({ browser: false, value: this.props.value }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentDidMount() {
    this.setState({ browser: true, value: this.props.value }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    let res = (<div>Loading</div>);
    if (this.state.browser) {
      const RteEditor = require('./RteEditor');
      res = (
        <RteEditor
          value={this.state.value}
          onChange={this.props.onChange}
        />
      );
    }
    return res;
  }
}
