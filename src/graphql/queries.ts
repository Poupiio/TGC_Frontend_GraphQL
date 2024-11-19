import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
   query GetAllAds {
      getAllAds {
         id
         title
         description
         owner
         price
         location
         createdAt
         category {
            id
            name
         }
         pictures {
            id
            url
         }
         tags {
            id
            name
         }
      }
   }
`;
               
export const GET_AD_BY_ID = gql`
   query GetAdById($getAdByIdId: Float!) {
      getAdById(id: $getAdByIdId) {
         id
         title
         description
         owner
         price
         pictures {
            url
         }
         location
         createdAt
         category {
            name
         }
         tags {
            name
         }
      }
   }
`;

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
   query GetAllCategoriesAndTags {
      getAllCategories {
         id
         name
      }
      getAllTags {
         id
         name
      }
  }
`;

export const GET_AD_BY_ID_AND_CATEGORIES_AND_TAGS = gql`
   query GetAdByIdAndAllCategoriesAndTags($getAdByIdId: Float!) {
      getAdById(id: $getAdByIdId) {
         id
         title
         description
         price
         pictures {
            url
         }
         location
         category {
            name
         }
         tags {
            name
         }
      }
      getAllCategories {
         id
         name
      }
      getAllTags {
         id
         name
      }
  }
`;