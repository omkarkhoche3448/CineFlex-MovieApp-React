import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromWishlist, setWishlist } from "../slices/wishlistSlice";
import WishListCard from "../components/common/WishListCard";
import Img from "../assets/boy.png";

function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleClearAll = () => {
    dispatch(setWishlist([]));
  };
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[78%] flex flex-row justify-between mt-24 p-2 box-border">
        <h2 className="font-bold text-xl text-white">WishList</h2>
        <div
          onClick={handleClearAll}
          className="flex flex-row gap-2 items-center bg-transparent cursor-pointer"
        >
          <MdDelete className="text-white" />
          <span className="text-xs text-white font-semibold">
            Clear All Wishlist
          </span>
        </div>
      </div>

      <div className="w-[80%] mt-4 flex flex-col md:flex-row flex-wrap items-center gap-4 px-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              className=" flex justify-start flex-1 min-h-[250px] min-w-[200px] max-w-[250px]"
              key={item.id}
            >
              <WishListCard
                item={item}
                handleRemove={() => handleRemoveFromWishlist(item.id)}
              />
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-full gap-2 mt-16">
            <img
              src={Img}
              alt="Add to wishlist"
              width="100"
              height="100"
              className="rounded-full"
            />
            <p className="font-bold text-white">Your wishlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
