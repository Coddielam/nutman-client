import client from '@root/apollo-client';
import { graphql } from '@root/codegen/strapi/gql';

// quering products by categories
const productsByCategoryQuery = graphql(`
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

// querying promotion slides
const promoSlidesQuery = graphql(`
  query PromoSlides {
    promoSlides(sort: "order") {
      data {
        id
        attributes {
          order
          promotion_slide {
            data {
              id
              attributes {
                width
                height
                formats
              }
            }
          }
        }
      }
    }
  }
`);

export const queryPromoSlides = async () => {
  const { data } = await client.query({
    query: promoSlidesQuery,
  });
  return data.promoSlides;
};

// query product categories list
const productCategoriesQuery = graphql(`
  query Categories {
    productCategories {
      data {
        id
        attributes {
          category_name
          category_name_en
          category_icon {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`);

export const queryProductCategories = async () => {
  const { data } = await client.query({
    query: productCategoriesQuery,
  });
  return data.productCategories;
};

// query all products in a category
const categoryProductsQuery = graphql(`
  query CategoryProducts($id: ID!) {
    productCategory(id: $id) {
      data {
        id
        attributes {
          category_name
          category_name_en
          products(pagination: { limit: 100 }) {
            data {
              id
              attributes {
                product_name_cn
                product_name_en
                product_price
                product_img {
                  data {
                    attributes {
                      url
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

export const queryCategoryProductsById = async (categoryId: number) => {
  const { data } = await client.query({
    query: categoryProductsQuery,
    variables: {
      id: categoryId.toString(),
    },
  });

  return data.productCategory;
};

// query all product categories' names and ids
const allProductCategoriesIdsNames = graphql(`
  query ProductCategories {
    productCategories {
      data {
        id
        attributes {
          category_name
          category_name_en
        }
      }
    }
  }
`);

export const queryAllProductCategoriesIdsNames = async () => {
  const { data } = await client.query({
    query: allProductCategoriesIdsNames,
  });

  return data.productCategories;
};

// query product by id
const productByIdQuery = graphql(`
  query Product($id: ID!) {
    product(id: $id) {
      data {
        id
        attributes {
          product_name_cn
          product_name_en
          product_desc_cn
          product_desc_en
          product_price
          product_categories {
            data {
              attributes {
                category_name
                category_name_en
              }
            }
          }
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
`);

export const queryProductById = async (productId: number) => {
  const { data } = await client.query({
    query: productByIdQuery,
    variables: {
      id: productId.toString(),
    },
  });
  return data.product;
};

// query all products' ids
const allProductIdsQuery = graphql(`
  query AllProductIds {
    products(pagination: { limit: 100 }) {
      data {
        id
      }
    }
  }
`);

export const queryAllProductIds = async () => {
  const { data } = await client.query({
    query: allProductIdsQuery,
  });
  return data.products;
};

// query featured categories
const featuredCategoryQuery = graphql(`
  query FeatureStacks {
    productCategories(filters: { feature_stack: { gt: 0 } }) {
      data {
        id
        attributes {
          category_name
          category_name_en
          products(pagination: { limit: 4 }) {
            data {
              id
              attributes {
                product_name_cn
                product_name_en
                product_price
                product_img {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          feature_stack
        }
      }
    }
  }
`);

export const queryFeaturedStackedCategories = async () => {
  const { data } = await client.query({
    query: featuredCategoryQuery,
  });
  return data.productCategories;
};
