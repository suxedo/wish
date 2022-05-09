import React from "react";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import "./NewWishModel.css";
function NewWishModel({ setIsOpenWish }) {
  const { control, handleSubmit, watch, reset } = useForm({});
  const onCloseModal = () => {
    setIsOpenWish(false);
  };
  return (
    <div className="wishModel">
      <div className="wishModel__container">
        <div className="wishModel__header">Your Wishlists</div>
        <div className="wishModel__content">
          <div className="wishModel__inputText">Create Wishlist</div>
          <div className="wishModel__inputSection">
            <CustomInput
              name="firstname"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Name should be max 24 characters long",
                },
              }}
            />

            <div className="wishModel__btn">Create</div>
          </div>
        </div>
        <div
          onClick={() => {
            setIsOpenWish(false);
          }}
          className="wishModel__cancelBtn"
        >
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="#3C4646"
              stroke-width="1.5"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 1l8 8M9 1L1 9"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NewWishModel;
