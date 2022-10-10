import client from '@root/apollo-client';
import gql from 'graphql-tag';

// Query popular products
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

// Query all existing categories
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

/*
 Query all product ids
 (this is used for dynamic route: /product/[id]) - see getStaticPaths
*/
interface IAllProductIdsRes {
  products: {
    data: {
      id: string;
    }[];
  };
}

export const queryAllProductIds = async () => {
  const { data } = await client.query<IAllProductIdsRes>({
    query: gql`
      query {
        products(pagination: { limit: 100 }) {
          data {
            id
          }
        }
      }
    `,
  });

  return data;
};

// Query product by id
export interface IProductDetail {
  id: string;
  attributes: {
    product_name_cn: string;
    product_desc_cn: string;
    product_price: number;
    product_categories: {
      data: { attributes: { category_name: 'string' } }[];
    };
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

export interface IProductDetailRes {
  product: {
    data: IProductDetail;
  };
}

export const queryProductById = async (id: string) => {
  const { data } = await client.query<IProductDetailRes>({
    query: gql`
      # Write your query or mutation here
      query Product($id: ID!) {
        product(id: $id) {
          data {
            id
            attributes {
              product_name_cn
              product_desc_cn
              product_price
              product_categories {
                data {
                  attributes {
                    category_name
                  }
                }
              }
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
    `,
    variables: {
      id,
    },
  });

  return data.product;
};
