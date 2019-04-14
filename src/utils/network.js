// @flow
import React, { ComponentType } from 'react';

import isFunction from 'lodash/isFunction';
import axios from 'axios';

export const API_URL = 'https://private-5fb3f-surveysmock.apiary-mock.com/api';

/*
 * Simple HOC component which passes fetched data using GET method to component
 * Provides three props - loading: boolean, data: any, error: any
 * @param url - can be either a string or a props mapping function
 */
export const withGetFetching = (url: string | Function) => (Component: ComponentType) => {
  class WithGetFetching extends React.Component {
    state = {
      data: null,
      loading: true,
      error: null,
    };

    componentDidMount() {
      // Calculate final url, if it's a function - pass to it current props
      const urlFinal = isFunction(url) ? url(this.props) : url;

      // Start doing request immediately after mount
      axios.get(urlFinal)
        .then(result => this.setState({
          data: result.data,
          loading: false
        }))
        .catch(error => this.setState({
          error,
          loading: false
        }));
    }

    render() {
      return <Component { ...this.props } { ...this.state } />;
    }
  }
  return WithGetFetching;
};
