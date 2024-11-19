import { gql } from "@apollo/client";

export const CREATE_AD = gql`
   mutation CreateNewAd($data: AdInput!) {
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

export const REMOVE_AD = gql`
   mutation RemoveAd($removeAdId: Float!) {
      removeAd(id: $removeAdId)
   }

`;