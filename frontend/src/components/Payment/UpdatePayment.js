import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updatePayment,
  getPaymentDetails,
} from "../../actions/paymentAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { UPDATE_PAYMENT_RESET } from "../../constants/paymentConstant";

import "../../css/Order/Shipping.css";

import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

import { Link } from "react-router-dom";

const UpdatePayment = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, paymented } = useSelector((state) => state.paymentDetail);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.payment);

  const [bankname, setBankname] = useState("");
  const [bankbranch, setBankbranch] = useState(0);
  const [accountbankname, setAccountbankname] = useState("");
  const [banknumber, setBanknumber] = useState("");

  const [imageqrcode, setImageqrcode] = useState();
  const [imageqrcodePreview, setImageqrcodePreview] = useState("/Profile.png");

  const productId = match.params.id;

  useEffect(() => {
    if (paymented && paymented._id !== productId) {
      dispatch(getPaymentDetails(productId));
    } else {
      setBankname(paymented.bankname);
      setBankbranch(paymented.bankbranch);
      setAccountbankname(paymented.accountbankname);
      setBanknumber(paymented.banknumber);
      setImageqrcodePreview(paymented.imageqrcode.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("แก้ไขข้อมูลสำเร็จ");
      history.push("/list-slip/payment");
      dispatch({ type: UPDATE_PAYMENT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    paymented,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("bankname", bankname);
    myForm.set("bankbranch", bankbranch);
    myForm.set("accountbankname", accountbankname);
    myForm.set("banknumber", banknumber);
    myForm.set("imageqrcode", imageqrcode);

    dispatch(updatePayment(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageqrcodePreview(reader.result);
        setImageqrcode(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [openModal, setOpenModal] = useState(false);

  const seclectBank = [
    {
      label: "กรุณาเลือก",
      value: "",
    },
    {
      label: "ธนาคารกรุงเทพ",
      value: "ธนาคารกรุงเทพ",
    },
    {
      label: "ธนาคารกสิกรไทย",
      value: "ธนาคารกสิกรไทย",
    },
    {
      label: "ธนาคารกรุงไทย",
      value: "ธนาคารกรุงไทย",
    },
    {
      label: "ธนาคารออมสิน",
      value: "ธนาคารออมสิน",
    },
    {
      label: "ธนาคารกรุงศรีอยุธยา",
      value: "ธนาคารกรุงศรีอยุธยา",
    },
    {
      label: "ธนาคารทหารไทย",
      value: "ธนาคารทหารไทย",
    },
    {
      label: "ธนาคารไทยพาณิชย์",
      value: "ธนาคารไทยพาณิชย์",
    },
    {
      label: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร ( ธกส )",
      value: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
    },
    {
      label: "ธนาคารซีไอเอ็มบีไทย",
      value: "ธนาคารซีไอเอ็มบีไทย",
    },
    {
      label: "ธนาคารทิสโก้",
      value: "ธนาคารทิสโก้",
    },
    {
      label: "ธนาคารธนชาต",
      value: "ธนาคารธนชาต",
    },
    {
      label: "ธนาคารยูโอบี",
      value: "ธนาคารยูโอบี",
    },
    {
      label: "ธนาคารยูโอบี",
      value: "ธนาคารยูโอบี",
    },
    {
      label: "ธนาคารอาคารสงเคราะห์",
      value: "ธนาคารอาคารสงเคราะห์",
    },
  ];

  return (
    <Fragment>
      <MetaData title="แก้ไขสลิปการชำระเงิน" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <div className="formTitle">
                <h1>ตั้งค่าบัญชี</h1>
                <h3>แก้ไขบัญชีเก็บค่าธรรมเนียม</h3>
              </div>
              <div className="formBox">
                <div className="gridBox">
                  <div class="formInput">
                    <label>บัญชีธนาคาร</label>
                    <select
                      className="selectBank"
                      placeholder="บัญชีธนาคาร"
                      name="bankname"
                      required
                      onChange={(e) => setBankname(e.target.value)}
                    >
                      {seclectBank.map((option) => (
                        <Fragment>
                          <option
                            value={option.value}
                            selected={
                              option.value === paymented.bankname ? true : false
                            }
                          >
                            {option.label}
                          </option>
                        </Fragment>
                      ))}
                    </select>
                  </div>
                  <div className="formInput">
                    <label>สาขาธนาคาร</label>
                    <input
                      type="text"
                      placeholder="สาขาธนาคาร"
                      required
                      onChange={(e) => setBankbranch(e.target.value)}
                      value={bankbranch}
                    />
                  </div>
                </div>
                <div className="gridBox">
                  <div className="formInput">
                    <label>ชื่อบัญชี</label>
                    <input
                      type="text"
                      placeholder="ชื่อเจ้าของบัญชีธนาคาร"
                      required
                      onChange={(e) => setAccountbankname(e.target.value)}
                      value={accountbankname}
                    />
                  </div>
                  <div className="formInput">
                    <label>เลขบัญชี</label>
                    <input
                      type="text"
                      pattern="^[0-9]{1-30}$"
                      placeholder="เลขบัญชีธนาคาร"
                      required
                      name="banknumber"
                      onChange={(e) => setBanknumber(e.target.value)}
                      value={banknumber}
                    />
                  </div>
                </div>
              </div>
              <div className="formBoxTop">
                <div className="gridBox">
                  <div className="formInput">
                    <div className="uploader">
                      <label>
                        <input
                          type="file"
                          id="imageUpload"
                          name="imageqrcode"
                          accept="image/*"
                          onChange={updateProductImagesChange}
                        />
                        <div className="fileTitle">
                          <h1>อัปโหลดภาพ QR Code</h1>
                          <h3>
                            สามารถแนบไฟล์ประเภท jpg, jpeg, และ png
                            ซึ่งขนาดของแต่ละไฟล์ต้องไม่เกิน 700 KB
                          </h3>
                        </div>
                        <div className="uploadImgBox">
                          <img
                            className={
                              imageqrcodePreview === "/Cloude.png"
                                ? "uploadImage"
                                : "SlipsImage"
                            }
                            src={imageqrcodePreview}
                            alt="imageqrcodePreview Preview"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <center className="btnBox">
                    <div className="btnBoxSub">
                      <div
                        className="btnSave btnSize btnEditProfile"
                        onClick={() => setOpenModal(true)}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </div>
                      <Link to="/list-slip/payment">
                        <button
                          className="btnSave btnSize btnCancel"
                          type="reset"
                        >
                          <div className="spanButton">
                            <MdIcons.MdCancel
                              className="iconEditImg"
                              size={22}
                            />
                            <p>ยกเลิก</p>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </center>
                </div>
              </div>

              <div className={openModal ? "openModal" : "closeModal"}>
                <div className="modal-content">
                  <div className="modal-header modal-SaveBar">
                    <MdIcons.MdClose
                      className="close"
                      size={35}
                      onClick={() => setOpenModal(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <IoIcons.IoIosCheckmarkCircleOutline
                      className="iconModal-Save"
                      size={120}
                    />
                    <div>
                      <p>คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลหรือไม่?</p>
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
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ยกเลิก</p>
                        </div>
                      </button>
                      <button
                        className="btnSave btnSize modal-Save"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePayment;
