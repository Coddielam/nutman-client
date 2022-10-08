import client from '@root/apollo-client';
import gql from 'graphql-tag';

export interface IPopularProduct {
  id: string;
  attributes: {
    product_name_cn: string;
    product_price: number;
    product_img: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
            };
            small: {
              url: string;
            };
            medium: {
              url: string;
            };
            large: {
              url: string;
            };
          };
        };
      }[];
    };
  };
}

export interface IQueryPopularProductsRes {
  products: {
    data: IPopularProduct[];
  };
}

export const queryPopularProducts = async () => {
  const { data } = await client.query<IQueryPopularProductsRes>({
    query: gql`
      query Products {
        products(pagination: { page: 1, pageSize: 4 }) {
          data {
            id
            attributes {
              product_name_cn
              product_price
              product_img {
                data {
                  attributes {
                    url
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return data.products;
};

export interface IProductCategory {
  id: string;
  attributes: {
    category_name: string;
  };
}
export interface IQueryProductCategoriesRes {
  productCategories: {
    data: IProductCategory[];
  };
}

export const queryProductCategories = async () => {
  const { data } = await client.query<IQueryProductCategoriesRes>({
    query: gql`
      query Categories {
        productCategories {
          data {
            id
            attributes {
              category_name
            }
          }
        }
      }
    `,
  });

  return data.productCategories;
};
