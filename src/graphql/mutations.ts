import { gql } from "@apollo/client";

export const CREATE_AD = gql`
   mutation Mutation($data: AdInput!) {
      createNewAd(data: $data) {
         id
      }
   }
`;

export const UPDATE_AD = gql`
   mutation UpdateAd($data: UpdateAdInput!) {
      updateAd(data: $data) {
         id
         title
         description
         owner
         price
         location
         createdAt
         category {
            name
         }
         pictures {
            url
         }
         tags {
            name
         }
      }
   }
`;
