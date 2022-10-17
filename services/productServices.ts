import client from '@root/apollo-client';
import gql from 'graphql-tag';

// Query popular products
export interface IProduct {
  id: string;
  attributes: {
    product_name_cn: string;
    product_name_en: string;
    product_price: number;
    product_desc_cn: string;
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

export interface IProducts {
  id: string;
  attributes: {
    category_name: string;
    category_name_en: string;
    products: {
      data: IProduct[];
    };
  };
}

export interface IQueryPopularProductsRes {
  productCategory: {
    data: {
      id: string;
      attributes: {
        category_name: string;
        category_name_en: string;
        products: {
          data: IProduct[];
        };
      };
    };
  };
}

export const queryPopularProducts = async () => {
  const { data } = await client.query<IQueryPopularProductsRes>({
    query: gql`
      query Products {
        productCategory(id: 1) {
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
    `,
  });

  return data.productCategory;
};

// query promotional slides
export interface IPromoSlide {
  id: string;
  attributes: {
    order: number;
    promotion_slide: {
      data: {
        id: string;
        attributes: {
          width: string;
          height: string;
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
      };
    };
  };
}

interface IPromoSlideRes {
  promoSlides: {
    data: IPromoSlide[];
  };
}

export const queryPromoSlides = async () => {
  const { data } = await client.query<IPromoSlideRes>({
    query: gql`
      query {
        promoSlides {
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
    `,
  });

  return data.promoSlides;
};

// Query all existing categories
export interface IProductCategoryName {
  id: string;
  attributes: {
    category_name: string;
    category_name_en: string;
    category_icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
export interface IQueryProductCategoriesRes {
  productCategories: {
    data: IProductCategoryName[];
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
    product_name_en: string;
    product_desc_cn: string;
    product_desc_en: string;
    product_price: number;
    product_categories: {
      data: {
        attributes: {
          category_name: string;
          category_name_en: string;
        };
      }[];
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

/*
 Query all product category ids
 (this is used for dynamic route: /category/[id]) - see getStaticPaths
*/

export interface IProductCategoriesIdsAndName {
  id: string;
  attributes: {
    category_name: string;
    category_name_en: string;
  };
}

export interface IAllProductCategoryIdAndNameRes {
  productCategories: { data: IProductCategoriesIdsAndName[] };
}

export const queryAllProductCategoryIds = async () => {
  const { data } = await client.query<IAllProductCategoryIdAndNameRes>({
    query: gql`
      query {
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
    `,
  });

  return data;
};

// Query products in category with category id
export interface ICategoryProducts {
  id: string;
  attributes: {
    category_name: string;
    category_name_en: string;
    products: {
      data: IProduct[];
    };
  };
}

export interface ICategoryProductsRes {
  productCategory: {
    data: ICategoryProducts;
  };
}

export const queryCategoryProductsById = async (category_id: string) => {
  const { data } = await client.query<ICategoryProductsRes>({
    query: gql`
      query CategoryProducts($id: ID!) {
        productCategory(id: $id) {
          data {
            id
            attributes {
              category_name
              category_name_en
              products {
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
    `,
    variables: {
      id: category_id,
    },
  });

  return data.productCategory;
};
