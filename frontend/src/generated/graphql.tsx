import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  poemStream: PoemStream;
  getUser: User;
  me?: Maybe<User>;
  photoStream: PhotoStream;
};


export type QueryPoemStreamArgs = {
  username?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  n: Scalars['Int'];
};


export type QueryGetUserArgs = {
  options: UserGetInputs;
};


export type QueryPhotoStreamArgs = {
  username?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  n: Scalars['Int'];
};

export type PoemStream = {
  __typename?: 'PoemStream';
  poems: Array<Poem>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type Poem = {
  __typename?: 'Poem';
  id: Scalars['Float'];
  poem: Scalars['String'];
  createdAt: Scalars['DateTime'];
  title: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  featuredArtwork: Artwork;
};

export type Artwork = {
  __typename?: 'Artwork';
  id: Scalars['Float'];
  type: Photo;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
  field: Scalars['String'];
};

export type UserGetInputs = {
  usernameOrEmail?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type PhotoStream = {
  __typename?: 'PhotoStream';
  photos?: Maybe<Array<Photo>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  uploadPoem: Poem;
  profilePictureUpload: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  photoUpload: PhotoResponse;
};


export type MutationUploadPoemArgs = {
  inputs: NewPoemInputs;
};


export type MutationProfilePictureUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationRegisterArgs = {
  options: UserRegisterInputs;
};


export type MutationLoginArgs = {
  options: UserLoginInputs;
};


export type MutationPhotoUploadArgs = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type NewPoemInputs = {
  poem: Scalars['String'];
  title: Scalars['String'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserRegisterInputs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInputs = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type PhotoResponse = {
  __typename?: 'PhotoResponse';
  photo?: Maybe<Photo>;
  errors?: Maybe<Array<FieldError>>;
};

export type PhotoUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type PhotoUploadMutation = (
  { __typename?: 'Mutation' }
  & { photoUpload: (
    { __typename?: 'PhotoResponse' }
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'createdAt' | 'title' | 'description' | 'userId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type PhotoStreamQueryVariables = Exact<{
  date: Scalars['String'];
  n: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
}>;


export type PhotoStreamQuery = (
  { __typename?: 'Query' }
  & { photoStream: (
    { __typename?: 'PhotoStream' }
    & Pick<PhotoStream, 'hasMore'>
    & { photos?: Maybe<Array<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'createdAt' | 'title' | 'description'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'email' | 'description'>
      ) }
    )>> }
  ) }
);

export type UploadPoemMutationVariables = Exact<{
  inputs: NewPoemInputs;
}>;


export type UploadPoemMutation = (
  { __typename?: 'Mutation' }
  & { uploadPoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'poem' | 'title'>
  ) }
);

export type LoginMutationVariables = Exact<{
  options: UserLoginInputs;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ProfilePictureUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type ProfilePictureUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'profilePictureUpload'>
);

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInputs;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  options: UserGetInputs;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);


export const PhotoUploadDocument = gql`
    mutation PhotoUpload($file: Upload!, $title: String!, $description: String!) {
  photoUpload(file: $file, title: $title, description: $description) {
    photo {
      id
      createdAt
      title
      description
      userId
    }
    errors {
      message
      field
    }
  }
}
    `;
export type PhotoUploadMutationFn = Apollo.MutationFunction<PhotoUploadMutation, PhotoUploadMutationVariables>;

/**
 * __usePhotoUploadMutation__
 *
 * To run a mutation, you first call `usePhotoUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhotoUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [photoUploadMutation, { data, loading, error }] = usePhotoUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function usePhotoUploadMutation(baseOptions?: Apollo.MutationHookOptions<PhotoUploadMutation, PhotoUploadMutationVariables>) {
        return Apollo.useMutation<PhotoUploadMutation, PhotoUploadMutationVariables>(PhotoUploadDocument, baseOptions);
      }
export type PhotoUploadMutationHookResult = ReturnType<typeof usePhotoUploadMutation>;
export type PhotoUploadMutationResult = Apollo.MutationResult<PhotoUploadMutation>;
export type PhotoUploadMutationOptions = Apollo.BaseMutationOptions<PhotoUploadMutation, PhotoUploadMutationVariables>;
export const PhotoStreamDocument = gql`
    query PhotoStream($date: String!, $n: Int!, $username: String) {
  photoStream(date: $date, n: $n, username: $username) {
    photos {
      id
      createdAt
      title
      description
      user {
        id
        username
        email
        description
      }
    }
    hasMore
  }
}
    `;

/**
 * __usePhotoStreamQuery__
 *
 * To run a query within a React component, call `usePhotoStreamQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhotoStreamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhotoStreamQuery({
 *   variables: {
 *      date: // value for 'date'
 *      n: // value for 'n'
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePhotoStreamQuery(baseOptions: Apollo.QueryHookOptions<PhotoStreamQuery, PhotoStreamQueryVariables>) {
        return Apollo.useQuery<PhotoStreamQuery, PhotoStreamQueryVariables>(PhotoStreamDocument, baseOptions);
      }
export function usePhotoStreamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PhotoStreamQuery, PhotoStreamQueryVariables>) {
          return Apollo.useLazyQuery<PhotoStreamQuery, PhotoStreamQueryVariables>(PhotoStreamDocument, baseOptions);
        }
export type PhotoStreamQueryHookResult = ReturnType<typeof usePhotoStreamQuery>;
export type PhotoStreamLazyQueryHookResult = ReturnType<typeof usePhotoStreamLazyQuery>;
export type PhotoStreamQueryResult = Apollo.QueryResult<PhotoStreamQuery, PhotoStreamQueryVariables>;
export const UploadPoemDocument = gql`
    mutation UploadPoem($inputs: NewPoemInputs!) {
  uploadPoem(inputs: $inputs) {
    id
    poem
    title
  }
}
    `;
export type UploadPoemMutationFn = Apollo.MutationFunction<UploadPoemMutation, UploadPoemMutationVariables>;

/**
 * __useUploadPoemMutation__
 *
 * To run a mutation, you first call `useUploadPoemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPoemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPoemMutation, { data, loading, error }] = useUploadPoemMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useUploadPoemMutation(baseOptions?: Apollo.MutationHookOptions<UploadPoemMutation, UploadPoemMutationVariables>) {
        return Apollo.useMutation<UploadPoemMutation, UploadPoemMutationVariables>(UploadPoemDocument, baseOptions);
      }
export type UploadPoemMutationHookResult = ReturnType<typeof useUploadPoemMutation>;
export type UploadPoemMutationResult = Apollo.MutationResult<UploadPoemMutation>;
export type UploadPoemMutationOptions = Apollo.BaseMutationOptions<UploadPoemMutation, UploadPoemMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: UserLoginInputs!) {
  login(options: $options) {
    errors {
      message
      field
    }
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ProfilePictureUploadDocument = gql`
    mutation ProfilePictureUpload($file: Upload!) {
  profilePictureUpload(file: $file)
}
    `;
export type ProfilePictureUploadMutationFn = Apollo.MutationFunction<ProfilePictureUploadMutation, ProfilePictureUploadMutationVariables>;

/**
 * __useProfilePictureUploadMutation__
 *
 * To run a mutation, you first call `useProfilePictureUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfilePictureUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profilePictureUploadMutation, { data, loading, error }] = useProfilePictureUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useProfilePictureUploadMutation(baseOptions?: Apollo.MutationHookOptions<ProfilePictureUploadMutation, ProfilePictureUploadMutationVariables>) {
        return Apollo.useMutation<ProfilePictureUploadMutation, ProfilePictureUploadMutationVariables>(ProfilePictureUploadDocument, baseOptions);
      }
export type ProfilePictureUploadMutationHookResult = ReturnType<typeof useProfilePictureUploadMutation>;
export type ProfilePictureUploadMutationResult = Apollo.MutationResult<ProfilePictureUploadMutation>;
export type ProfilePictureUploadMutationOptions = Apollo.BaseMutationOptions<ProfilePictureUploadMutation, ProfilePictureUploadMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInputs!) {
  register(options: $options) {
    user {
      id
      username
      email
    }
    errors {
      message
      field
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($options: UserGetInputs!) {
  getUser(options: $options) {
    id
    username
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;