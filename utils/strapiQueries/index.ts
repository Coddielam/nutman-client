import client from '@root/apollo-client';
import { graphql } from '@root/codegen/strapi/gql';

export const productsByCategoryQuery = graphql(`
  query Products($id: ID!) {
    productCategory(id: $id) {
      data {
        id
        attributes {
          category_name
          category_name_en
          products(pagination: { page: 1, pageSize: 4 }) {
            data {
              id
              attributes {
                product_name_cn
                product_name_en
                product_price
                product_img {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export const queryProductsByCategory = async (id: number) => {
  const { data } = await client.query({
    query: productsByCategoryQuery,
    variables: {
      id: id.toString(),
    },
  });
  return data.productCategory;
};
