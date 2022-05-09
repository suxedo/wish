/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateCartProduct = /* GraphQL */ `
  subscription OnCreateCartProduct {
    onCreateCartProduct {
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
export const onUpdateCartProduct = /* GraphQL */ `
  subscription OnUpdateCartProduct {
    onUpdateCartProduct {
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
export const onDeleteCartProduct = /* GraphQL */ `
  subscription OnDeleteCartProduct {
    onDeleteCartProduct {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateOrderProduct = /* GraphQL */ `
  subscription OnCreateOrderProduct {
    onCreateOrderProduct {
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
export const onUpdateOrderProduct = /* GraphQL */ `
  subscription OnUpdateOrderProduct {
    onUpdateOrderProduct {
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
export const onDeleteOrderProduct = /* GraphQL */ `
  subscription OnDeleteOrderProduct {
    onDeleteOrderProduct {
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
export const onCreateUserFollowing = /* GraphQL */ `
  subscription OnCreateUserFollowing {
    onCreateUserFollowing {
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
export const onUpdateUserFollowing = /* GraphQL */ `
  subscription OnUpdateUserFollowing {
    onUpdateUserFollowing {
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
export const onDeleteUserFollowing = /* GraphQL */ `
  subscription OnDeleteUserFollowing {
    onDeleteUserFollowing {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateWishRooms = /* GraphQL */ `
  subscription OnCreateWishRooms {
    onCreateWishRooms {
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
export const onUpdateWishRooms = /* GraphQL */ `
  subscription OnUpdateWishRooms {
    onUpdateWishRooms {
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
export const onDeleteWishRooms = /* GraphQL */ `
  subscription OnDeleteWishRooms {
    onDeleteWishRooms {
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
export const onCreateWishProducts = /* GraphQL */ `
  subscription OnCreateWishProducts {
    onCreateWishProducts {
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
export const onUpdateWishProducts = /* GraphQL */ `
  subscription OnUpdateWishProducts {
    onUpdateWishProducts {
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
export const onDeleteWishProducts = /* GraphQL */ `
  subscription OnDeleteWishProducts {
    onDeleteWishProducts {
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
