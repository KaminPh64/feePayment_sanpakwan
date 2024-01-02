import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deletePayment,
  getAllPayment,
} from "../../actions/paymentAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_PAYMENT_RESET } from "../../constants/paymentConstant";
import MetaData from "../layout/MetaData";

import "../../css/Order/Shipping.css";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

const ListSlipPayment = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, allpayments } = useSelector(
    (state) => state.allPayment
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.payment
  );

  const deletePaymentHandler = (id) => {
    dispatch(deletePayment(id));
    setOpenModal(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("ลบข้อมูลสำเร็จ");
      history.push("/list-slip/payment");
      dispatch({ type: DELETE_PAYMENT_RESET });
    }

    dispatch(getAllPayment());
  }, [dispatch, alert, error, history, isDeleted, deleteError]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <MetaData title="รายการสลิปการชำระเงิน" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <div className="formTitle">
                <h1>บัญชีเก็บค่าธรรมเนียม</h1>
              </div>
              {allpayments &&
                allpayments.map((item) => (
                  <div key={item._id}>
                    <div className="formBox">
                      <div className="gridBox">
                        <div className="formInput">
                          <label>บัญชีธนาคาร</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.bankname}
                            readOnly
                          />
                        </div>
                        <div className="formInput">
                          <label>สาขาธนาคาร</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.bankbranch}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="gridBox">
                        <div className="formInput">
                          <label>ชื่อบัญชี</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.accountbankname}
                            readOnly
                          />
                        </div>
                        <div className="formInput">
                          <label>เลขบัญชี</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.banknumber}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formBoxTop">
                      <div className="gridBox">
                        <div className="formInput">
                          <div className="uploader">
                            <center>
                              <div className="fileTitle">
                                <h3>รูปภาพ QR Code</h3>
                              </div>
                              <div className="uploadImgBox">
                                <img
                                  className="SlipsImage"
                                  src={item.imageqrcode.url}
                                  alt="imageqrcode"
                                />
                              </div>
                            </center>
                          </div>
                        </div>
                        <center className="btnBox">
                          <Link to={`/update/payment/${item._id}`}>
                            <button className="btnSave btnSize btnEditProfile">
                              <div className="spanButton">
                                <MdIcons.MdSave
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p>แก้ไขข้อมูล</p>
                              </div>
                            </button>
                          </Link>
                          <button
                            className="btnSave btnSize btnCancel"
                            onClick={() => setOpenModal(true)}
                          >
                            <div className="spanButton">
                              <MdIcons.MdDelete
                                className="iconEditImg"
                                size={22}
                              />
                              <p>ลบ</p>
                            </div>
                          </button>
                        </center>
                      </div>
                    </div>
                    <div className={openModal ? "openModal" : "closeModal"}>
                      <div className="modal-content">
                        <div className="modal-header modal-DeleteBar">
                          <MdIcons.MdClose
                            className="close"
                            size={35}
                            onClick={() => setOpenModal(false)}
                          />
                        </div>
                        <div className="modal-body">
                          <IoIcons.IoIosCloseCircleOutline
                            className="iconModal-Delete"
                            size={120}
                          />
                          <div>
                            <p>คุณแน่ใจหรือไม่ว่าคุณต้องการลบข้อมูล?</p>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <center className="btnBox">
                            <button
                              className="btnSave btnSize modal-Cancel"
                              type="reset"
                              onClick={() => window.location.reload()}
                            >
                              <div className="spanButton">
                                <MdIcons.MdCancel
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p>ยกเลิก</p>
                              </div>
                            </button>
                            <button
                              className="btnSave btnSize modal-Delete"
                              type="submit"
                              onClick={() => deletePaymentHandler(item._id)}
                            >
                              <div className="spanButton">
                                <MdIcons.MdDelete
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p>ลบ</p>
                              </div>
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListSlipPayment;
