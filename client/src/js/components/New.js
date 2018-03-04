import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_DOG = gql`
  query {
    AllBlog {
      title
      content
    }
  }
`

const NewApp = () => (
  <Query query={GET_DOG}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      console.log(data);
      return (
       <div className="App">
         <header className="App-header">
           <h1 className="App-title">{data.AllBlog[0].title}</h1>
         </header>
       </div>
      )
    }}
  </Query>
);

export default NewApp;
