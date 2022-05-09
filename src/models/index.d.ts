import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserFollowingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WishRoomsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WishProductsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly userSub: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly username: string;
  readonly email: string;
  readonly profile?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Category {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Product {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly url: string;
  readonly images: string[];
  readonly size?: string[];
  readonly color?: string[];
  readonly categories?: string[];
  readonly avgRating?: number;
  readonly ratings?: number;
  readonly price: number;
  readonly shipping?: number;
  readonly oldPrice?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class CartProduct {
  readonly id: string;
  readonly userSub: string;
  readonly quantity: number;
  readonly productId: string;
  readonly option?: string;
  readonly product?: Product;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CartProduct, CartProductMetaData>);
  static copyOf(source: CartProduct, mutator: (draft: MutableModel<CartProduct, CartProductMetaData>) => MutableModel<CartProduct, CartProductMetaData> | void): CartProduct;
}

export declare class Order {
  readonly id: string;
  readonly userSub: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly addressline1: string;
  readonly addressline2?: string;
  readonly country: string;
  readonly state?: string;
  readonly city?: string;
  readonly zip?: string;
  readonly phonenumber?: string;
  readonly check?: boolean;
  readonly product?: (Product | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class OrderProduct {
  readonly id: string;
  readonly quantity: number;
  readonly productId: string;
  readonly product?: (Product | null)[];
  readonly orderId: string;
  readonly order?: (Order | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OrderProduct, OrderProductMetaData>);
  static copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct, OrderProductMetaData>) => MutableModel<OrderProduct, OrderProductMetaData> | void): OrderProduct;
}

export declare class UserFollowing {
  readonly id: string;
  readonly userSub: string;
  readonly userId: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserFollowing, UserFollowingMetaData>);
  static copyOf(source: UserFollowing, mutator: (draft: MutableModel<UserFollowing, UserFollowingMetaData>) => MutableModel<UserFollowing, UserFollowingMetaData> | void): UserFollowing;
}

export declare class Comment {
  readonly id: string;
  readonly creatorId: string;
  readonly productId: string;
  readonly text: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class WishRooms {
  readonly id: string;
  readonly userSub: string;
  readonly name: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WishRooms, WishRoomsMetaData>);
  static copyOf(source: WishRooms, mutator: (draft: MutableModel<WishRooms, WishRoomsMetaData>) => MutableModel<WishRooms, WishRoomsMetaData> | void): WishRooms;
}

export declare class WishProducts {
  readonly id: string;
  readonly roomId: string;
  readonly productId: string;
  readonly userSub: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WishProducts, WishProductsMetaData>);
  static copyOf(source: WishProducts, mutator: (draft: MutableModel<WishProducts, WishProductsMetaData>) => MutableModel<WishProducts, WishProductsMetaData> | void): WishProducts;
}