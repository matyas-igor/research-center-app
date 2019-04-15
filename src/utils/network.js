// @flow
import React, { Component, ComponentType } from 'react';

import axios from 'axios';

import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';

import { getDisplayName } from 'recompose';

export const API_URL = 'https://private-5fb3f-surveysmock.apiary-mock.com/api';

/*
 * HOC component which passes fetched data using GET method to its children component
 * Provides three props - loading: boolean, data: any, error: any
 * @param url - can be either a string or a props mapping function
 */
export const withGetFetching = (url: string | Function) => (WrappedComponent: ComponentType) => {
  class WithGetFetching extends Component {
    state = {
      data: null,
      loading: true,
      error: null,
    };

    componentDidMount() {
      // calculate final url, if it's a function - pass current props to it
      const urlFinal = isFunction(url) ? url(this.props) : url;

      // start doing request immediately after mount
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
      return <WrappedComponent { ...this.props } { ...this.state } />;
    }
  }
  WithGetFetching.displayName = `WithGetFetching(${getDisplayName(WrappedComponent)})`;
  return WithGetFetching;
};

/*
 * HOC component which provides methods to perform POST requests
 * Also provides 'requesting' props with flags of running requests 
 * @param requests - object with values of urls - can be either a string or a props mapping function
 */
export const withPostRequesting = (requests: { [string]: string | Function }) => (WrappedComponent: ComponentType) => {
  class WithPostRequesting extends Component {
    state = {
      requesting: mapValues(requests, () => false),
      ...mapValues(requests, (requestUrl, requestName) => {
        // returns callable function where you can start POST request and pass form data as a props
        return (props: any) => new Promise((resolve) => {
          // set requesting flag to true at first
          this.setState(({ requesting }) => ({
            requesting: {
              ...requesting,
              [requestName]: true,
            },
          }), async () => {
            // initially set data & error to null
            let data = null;
            let error = null;

            // calculate final url, if it's a function - pass current props to it
            const requestUrlFinal = isFunction(requestUrl) ? requestUrl(this.props) : requestUrl;

            // then starts POST request
            try {
              const result = await axios.post(requestUrlFinal, props);
              data = result.data;
            } catch (e) {
              error = e;
            }

            // at last step set requesting flag to false and resolve promise
            this.setState(({ requesting }) => ({
              requesting: {
                ...requesting,
                [requestName]: false,
              },
            }), () => resolve({ data, error }));
          });
        });
      }),
    };

    render() {
      return <WrappedComponent { ...this.props } { ...this.state } />;
    }
  }
  WithPostRequesting.displayName = `WithPostRequesting(${getDisplayName(WrappedComponent)})`;
  return WithPostRequesting;
};
