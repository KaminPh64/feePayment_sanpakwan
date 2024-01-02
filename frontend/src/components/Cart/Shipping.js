import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import CheckoutStep from "../Cart/CheckoutStep.js";
import * as FaIcons from "react-icons/fa";

import Select from "react-select";

import "../../css/Order/Shipping.css";

import bankok from './../../images/bankicon/1.png'
import kasikorn from './../../images/bankicon/2.png'
import krungthai from './../../images/bankicon/3.png'
import thaipanish from './../../images/bankicon/4.png'
import tmb from './../../images/bankicon/8.png'
import aomsin from './../../images/bankicon/18.png'
import krungsri from './../../images/bankicon/14.png'
import togoso from './../../images/bankicon/22.png'
import cimp from './../../images/bankicon/cimp.png'
import ticco from './../../images/bankicon/27.png'
import tanachat from './../../images/bankicon/25.png'
import uob from './../../images/bankicon/13.png'
import toaoso from './../../images/bankicon/21.png'


function Shipping({ history }) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  let sumPrice = cartItems.reduce((acc, item) => {
    return (
      acc +
      item.quantity * item.trash ||
      acc + item.quantity * item.wastewater ||
      acc + item.quantity * item.wastewater + item.wastewater
    );
  }, 0);

  const [bankname, setBankname] = useState("");
  const [amount, setAmount] = useState(sumPrice);
  const [dateofpayment, setDateofpayment] = useState("");
  const [timeofpayment, setTimeofpayment] = useState("");
  const [comment, setComment] = useState("");
  const [imageslip, setImageslip] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Cloude.png");

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setImageslip(reader.result);
      setAvatarPreview(reader.result);
    };
  };

  const handleSave = () => {
    localStorage.setItem("image", imageslip);
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        bankname,
        amount,
        dateofpayment,
        timeofpayment,
        comment,
        imageslip,
      })
    );
    history.push("/order/confirm");
  };

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
      <MetaData title="ข้อมูลการชำระเงิน" />
      <CheckoutStep activeStep={0} />

      <div className="pageModel">
        <form
          className="formModel"
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
          <div className="formTitle">
            <h1>แนบหลักฐานชำระเงิน</h1>
            <h3>กรอกข้อมูลให้ครบถ้วน และแนบหลักฐานการชำระเงิน</h3>
          </div>
          <div className="formBox">
            <div className="gridBox">
              <div class="formInput">
                <label>ธนาคาร</label>
                <select
                  className="selectBank"
                  name="bankname"
                  required
                  onChange={(e) => setBankname(e.target.value)}
                >
                  {seclectBank.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>จำนวนเงินที่ชำระ</label>
                <input
                  type="text"
                  placeholder="จำนวนเงินที่ชำระ (บาท) "
                  required
                  readOnly
                  disabled
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="gridBox">
              <div className="formInput">
                <label>วันที่โอนเงิน</label>
                <input
                  type="date"
                  placeholder="วันที่โอนเงิน"
                  required
                  value={dateofpayment}
                  onChange={(e) => setDateofpayment(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>เวลาโอนเงิน</label>
                <input
                  type="time"
                  placeholder="เวลาโอนเงิน (เช่น 00:00)"
                  required
                  value={timeofpayment}
                  onChange={(e) => setTimeofpayment(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="formBoxTop">
            <div className="gridBox">
              <div className="formInput">
                <label>หมายเหตุ</label>
                <textarea
                  className="commentBox"
                  placeholder="หมายเหตุ (ไม่จำเป็น)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="formInput">
                <div className="uploader">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      required
                    />
                    <div className="fileTitle">
                      <h1>อัปโหลดหลักฐานชำระเงิน</h1>
                      <h3>
                        คุณสามารถแนบไฟล์ประเภท jpg, jpeg, และ png
                        ซึ่งขนาดของแต่ละไฟล์ต้องไม่เกิน 2 MB
                      </h3>
                    </div>
                    <div className="uploadImgBox">
                      <img
                        className={
                          avatarPreview === "/Cloude.png"
                            ? "uploadImage"
                            : "SlipsImage"
                        }
                        src={avatarPreview}
                        alt="SlipsPreview"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <center className="pmmFooter">
                <button
                  type="submit"
                  className="btnSave btnPayment"
                  onClick={handleSave}
                >
                  <div className="spanButton">
                    <FaIcons.FaMoneyBillAlt className="iconEditImg" size={22} />
                    <p>แนบหลักฐานชำระเงิน</p>
                  </div>
                </button>
              </center>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Shipping;
