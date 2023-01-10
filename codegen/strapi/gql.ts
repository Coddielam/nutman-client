/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query Products($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { page: 1, pageSize: 4 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      formats\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ProductsDocument,
    "\n  query PromoSlides {\n    promoSlides(sort: \"order\") {\n      data {\n        id\n        attributes {\n          order\n          promotion_slide {\n            data {\n              id\n              attributes {\n                width\n                height\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PromoSlidesDocument,
    "\n  query Categories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          category_icon {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  query CategoryProducts($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { limit: 100 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CategoryProductsDocument,
    "\n  query ProductCategories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n        }\n      }\n    }\n  }\n": types.ProductCategoriesDocument,
    "\n  query Product($id: ID!) {\n    product(id: $id) {\n      data {\n        id\n        attributes {\n          product_name_cn\n          product_name_en\n          product_desc_cn\n          product_desc_en\n          product_price\n          product_categories {\n            data {\n              attributes {\n                category_name\n                category_name_en\n              }\n            }\n          }\n          product_img {\n            data {\n              attributes {\n                url\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ProductDocument,
    "\n  query AllProductIds {\n    products(pagination: { limit: 100 }) {\n      data {\n        id\n      }\n    }\n  }\n": types.AllProductIdsDocument,
    "\n  query FeatureStacks {\n    productCategories(\n      filters: { feature_stack: { gt: 0 } }\n      pagination: { start: 0, limit: 2 }\n    ) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          feature_stack\n        }\n      }\n    }\n  }\n": types.FeatureStacksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { page: 1, pageSize: 4 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      formats\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Products($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { page: 1, pageSize: 4 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      formats\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PromoSlides {\n    promoSlides(sort: \"order\") {\n      data {\n        id\n        attributes {\n          order\n          promotion_slide {\n            data {\n              id\n              attributes {\n                width\n                height\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PromoSlides {\n    promoSlides(sort: \"order\") {\n      data {\n        id\n        attributes {\n          order\n          promotion_slide {\n            data {\n              id\n              attributes {\n                width\n                height\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          category_icon {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          category_icon {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoryProducts($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { limit: 100 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CategoryProducts($id: ID!) {\n    productCategory(id: $id) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products(pagination: { limit: 100 }) {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductCategories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductCategories {\n    productCategories {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($id: ID!) {\n    product(id: $id) {\n      data {\n        id\n        attributes {\n          product_name_cn\n          product_name_en\n          product_desc_cn\n          product_desc_en\n          product_price\n          product_categories {\n            data {\n              attributes {\n                category_name\n                category_name_en\n              }\n            }\n          }\n          product_img {\n            data {\n              attributes {\n                url\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Product($id: ID!) {\n    product(id: $id) {\n      data {\n        id\n        attributes {\n          product_name_cn\n          product_name_en\n          product_desc_cn\n          product_desc_en\n          product_price\n          product_categories {\n            data {\n              attributes {\n                category_name\n                category_name_en\n              }\n            }\n          }\n          product_img {\n            data {\n              attributes {\n                url\n                formats\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllProductIds {\n    products(pagination: { limit: 100 }) {\n      data {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllProductIds {\n    products(pagination: { limit: 100 }) {\n      data {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FeatureStacks {\n    productCategories(\n      filters: { feature_stack: { gt: 0 } }\n      pagination: { start: 0, limit: 2 }\n    ) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          feature_stack\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FeatureStacks {\n    productCategories(\n      filters: { feature_stack: { gt: 0 } }\n      pagination: { start: 0, limit: 2 }\n    ) {\n      data {\n        id\n        attributes {\n          category_name\n          category_name_en\n          products {\n            data {\n              id\n              attributes {\n                product_name_cn\n                product_name_en\n                product_price\n                product_img {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          feature_stack\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;