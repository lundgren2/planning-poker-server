import { gql } from 'apollo-server-express';
import axios from 'axios';
// import { API_URL } from '../config';
const API_URL = 'http://localhost:4000/graphql';

export const signup = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
          token
          user {
            email
          }
        }
      }
    `,
    variables,
  });

export const login = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables,
  });
