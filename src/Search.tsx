import PropTypes from "prop-types";
import React, { Component } from "react";
import { Search, Grid, Header, Segment, Label } from "semantic-ui-react";
import _ from "lodash";

const source = [
  {
    command: 1
  }
];

const resultRenderer = ({ title }: any) => <Label content={title} />;

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

const initialState = { isLoading: false, results: [], value: "" };

export default class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e: any, { result }: any) =>
    this.setState({ value: result.title });

  handleSearchChange = (e: any, { value }: any) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result: any) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={16}>
          <Search
            style={{ width: "100%" }}
            input={{ fluid: true }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
