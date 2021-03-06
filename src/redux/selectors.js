import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
const selectWisherObj = (state) => state.wisher;
const selectWishesArr = (state) => state.wishes;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
export const selectWisher = createSelector(
  [selectWisherObj],
  (wisher) => wisher.wisher
);
export const selectWishes = createSelector(
  [selectWishesArr],
  (wishes) => wishes.wishes
);
