import React, { useEffect, useState } from "react";
import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  emptyCartItem,
  removeFromCart,
  removeSingle,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";
const CardDetails = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalqty, setTotalQty] = useState(0);
  const { carts } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  const handleDecrement = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item removed from Cart");
  };

  const handleEmpty = (e) => {
    dispatch(emptyCartItem(e));
    toast.success("Your cart is empty");
  };

  const handleSingleDec = (e) => {
    dispatch(removeSingle(e));
  };

  const total = () => {
    let totalPrice = 0;
    carts.map((ele, ind) => {
      totalPrice = ele.price * ele.qnty + totalPrice;
    });
    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    total();
  }, [total]);

  const countqty = () => {
    let totalqty = 0;
    carts.map((ele, ind) => {
      totalqty = ele.qnty + totalqty;
    });
    setTotalQty(totalqty);
  };
  useEffect(() => {
    countqty();
  }, [countqty]);
  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Summary{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={() => handleEmpty()}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>EmptyCart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                className="prdct-delete"
                                onClick={() => handleDecrement(data.id)}
                              >
                                <i className="fa fa-trash-alt mr-2"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt="" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>{data.price}</td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  className="prdct-qty-btn"
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDecrement(data.id)
                                      : () => handleSingleDec(data)
                                  }
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                  name=""
                                  id=""
                                />
                                <button
                                  className="prdct-qty-btn"
                                  onClick={() => handleIncrement(data)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              {data.qnty * data.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items in Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalqty}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalPrice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
