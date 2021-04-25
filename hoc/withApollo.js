import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import withApollo from 'next-with-apollo';
import moment from 'moment';

export default withApollo (

  ({ initialState, headers }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || { }),
      link: new HttpLink({ uri: "http://localhost:3000/graphql", credentials: 'include', headers }),
      resolvers: {
        Portfolio: {
          daysofExperience({ startDate, endDate }, args, { cache }) {
            let now = moment().unix();
            if(endDate) {
              now = endDate / 1000;
            }
            return moment.unix(now).diff(moment.unix(startDate / 1000 ), 'days');
          }
        }
      }
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
