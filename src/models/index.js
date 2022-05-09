// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Category, Product, CartProduct, Order, OrderProduct, UserFollowing, Comment, WishRooms, WishProducts } = initSchema(schema);

export {
  User,
  Category,
  Product,
  CartProduct,
  Order,
  OrderProduct,
  UserFollowing,
  Comment,
  WishRooms,
  WishProducts
};