import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<PictureInput>>;
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<TagInput>>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  createNewCategory: Category;
  removeAd: Scalars['String']['output'];
  removeCategory: Scalars['String']['output'];
  updateAd: Ad;
  updateCategory: Category;
};


export type MutationCreateNewAdArgs = {
  data: AdInput;
};


export type MutationCreateNewCategoryArgs = {
  data: CategoryInput;
};


export type MutationRemoveAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['Float']['input'];
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllPictures: Array<Picture>;
  getAllTags: Array<Tag>;
  getCategoryById: Category;
  getPictureById: Picture;
  getTagById: Tag;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetPictureByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Float']['input'];
};

export type UpdateAdInput = {
  category: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picturesUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMutationVariables = Exact<{
  data: AdInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number } };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category: { __typename?: 'Category', name: string }, pictures: Array<{ __typename?: 'Picture', url: string }>, tags?: Array<{ __typename?: 'Tag', name: string }> | null } };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category: { __typename?: 'Category', id: number, name: string }, pictures: Array<{ __typename?: 'Picture', url: string }>, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', url: string }>, category: { __typename?: 'Category', name: string }, tags?: Array<{ __typename?: 'Tag', name: string }> | null } };

export type GetAllCategoriesAndTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesAndTagsQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }>, getAllTags: Array<{ __typename?: 'Tag', id: number, name: string }> };


export const MutationDocument = gql`
    mutation Mutation($data: AdInput!) {
  createNewAd(data: $data) {
    id
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const UpdateAdDocument = gql`
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
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const GetAllAdsDocument = gql`
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
      url
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAdByIdDocument = gql`
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

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const GetAllCategoriesAndTagsDocument = gql`
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

/**
 * __useGetAllCategoriesAndTagsQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesAndTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesAndTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesAndTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesAndTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
      }
export function useGetAllCategoriesAndTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export function useGetAllCategoriesAndTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export type GetAllCategoriesAndTagsQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsQuery>;
export type GetAllCategoriesAndTagsLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsLazyQuery>;
export type GetAllCategoriesAndTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsSuspenseQuery>;
export type GetAllCategoriesAndTagsQueryResult = Apollo.QueryResult<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>;