/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      userSub
      id
      firstname
      lastname
      username
      email
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      userSub
      id
      firstname
      lastname
      username
      email
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      userSub
      id
      firstname
      lastname
      username
      email
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      description
      url
      images
      size
      color
      categories
      avgRating
      ratings
      price
      shipping
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      description
      url
      images
      size
      color
      categories
      avgRating
      ratings
      price
      shipping
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      description
      url
      images
      size
      color
      categories
      avgRating
      ratings
      price
      shipping
      oldPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCartProduct = /* GraphQL */ `
  mutation CreateCartProduct(
    $input: CreateCartProductInput!
    $condition: ModelCartProductConditionInput
  ) {
    createCartProduct(input: $input, condition: $condition) {
      id
      userSub
      quantity
      productId
      option
      product {
        id
        name
        description
        url
        images
        size
        color
        categories
        avgRating
        ratings
        price
        shipping
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCartProduct = /* GraphQL */ `
  mutation UpdateCartProduct(
    $input: UpdateCartProductInput!
    $condition: ModelCartProductConditionInput
  ) {
    updateCartProduct(input: $input, condition: $condition) {
      id
      userSub
      quantity
      productId
      option
      product {
        id
        name
        description
        url
        images
        size
        color
        categories
        avgRating
        ratings
        price
        shipping
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCartProduct = /* GraphQL */ `
  mutation DeleteCartProduct(
    $input: DeleteCartProductInput!
    $condition: ModelCartProductConditionInput
  ) {
    deleteCartProduct(input: $input, condition: $condition) {
      id
      userSub
      quantity
      productId
      option
      product {
        id
        name
        description
        url
        images
        size
        color
        categories
        avgRating
        ratings
        price
        shipping
        oldPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      userSub
      firstname
      lastname
      addressline1
      addressline2
      country
      state
      city
      zip
      phonenumber
      check
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      userSub
      firstname
      lastname
      addressline1
      addressline2
      country
      state
      city
      zip
      phonenumber
      check
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      userSub
      firstname
      lastname
      addressline1
      addressline2
      country
      state
      city
      zip
      phonenumber
      check
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOrderProduct = /* GraphQL */ `
  mutation CreateOrderProduct(
    $input: CreateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    createOrderProduct(input: $input, condition: $condition) {
      id
      quantity
      productId
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      orderId
      order {
        items {
          id
          userSub
          firstname
          lastname
          addressline1
          addressline2
          country
          state
          city
          zip
          phonenumber
          check
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOrderProduct = /* GraphQL */ `
  mutation UpdateOrderProduct(
    $input: UpdateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    updateOrderProduct(input: $input, condition: $condition) {
      id
      quantity
      productId
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      orderId
      order {
        items {
          id
          userSub
          firstname
          lastname
          addressline1
          addressline2
          country
          state
          city
          zip
          phonenumber
          check
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOrderProduct = /* GraphQL */ `
  mutation DeleteOrderProduct(
    $input: DeleteOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    deleteOrderProduct(input: $input, condition: $condition) {
      id
      quantity
      productId
      product {
        items {
          id
          name
          description
          url
          images
          size
          color
          categories
          avgRating
          ratings
          price
          shipping
          oldPrice
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      orderId
      order {
        items {
          id
          userSub
          firstname
          lastname
          addressline1
          addressline2
          country
          state
          city
          zip
          phonenumber
          check
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUserFollowing = /* GraphQL */ `
  mutation CreateUserFollowing(
    $input: CreateUserFollowingInput!
    $condition: ModelUserFollowingConditionInput
  ) {
    createUserFollowing(input: $input, condition: $condition) {
      id
      userSub
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserFollowing = /* GraphQL */ `
  mutation UpdateUserFollowing(
    $input: UpdateUserFollowingInput!
    $condition: ModelUserFollowingConditionInput
  ) {
    updateUserFollowing(input: $input, condition: $condition) {
      id
      userSub
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserFollowing = /* GraphQL */ `
  mutation DeleteUserFollowing(
    $input: DeleteUserFollowingInput!
    $condition: ModelUserFollowingConditionInput
  ) {
    deleteUserFollowing(input: $input, condition: $condition) {
      id
      userSub
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      creatorId
      productId
      text
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      creatorId
      productId
      text
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      creatorId
      productId
      text
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createWishRooms = /* GraphQL */ `
  mutation CreateWishRooms(
    $input: CreateWishRoomsInput!
    $condition: ModelWishRoomsConditionInput
  ) {
    createWishRooms(input: $input, condition: $condition) {
      id
      userSub
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWishRooms = /* GraphQL */ `
  mutation UpdateWishRooms(
    $input: UpdateWishRoomsInput!
    $condition: ModelWishRoomsConditionInput
  ) {
    updateWishRooms(input: $input, condition: $condition) {
      id
      userSub
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWishRooms = /* GraphQL */ `
  mutation DeleteWishRooms(
    $input: DeleteWishRoomsInput!
    $condition: ModelWishRoomsConditionInput
  ) {
    deleteWishRooms(input: $input, condition: $condition) {
      id
      userSub
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createWishProducts = /* GraphQL */ `
  mutation CreateWishProducts(
    $input: CreateWishProductsInput!
    $condition: ModelWishProductsConditionInput
  ) {
    createWishProducts(input: $input, condition: $condition) {
      id
      roomId
      productId
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWishProducts = /* GraphQL */ `
  mutation UpdateWishProducts(
    $input: UpdateWishProductsInput!
    $condition: ModelWishProductsConditionInput
  ) {
    updateWishProducts(input: $input, condition: $condition) {
      id
      roomId
      productId
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWishProducts = /* GraphQL */ `
  mutation DeleteWishProducts(
    $input: DeleteWishProductsInput!
    $condition: ModelWishProductsConditionInput
  ) {
    deleteWishProducts(input: $input, condition: $condition) {
      id
      roomId
      productId
      userSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
