import React, { useRef } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import actionUnit from "@actions/unit";
import ScanQrCode from "./modal-create-form-with-ref";
function index(props) {
  const refQRCodeScaner = useRef(null);
  const onScanQRcode = () => {
    if (refQRCodeScaner.current) {
      refQRCodeScaner.current.show();
    }
  };
  const handleSubmit = (payload) => {
    props.createOrEdit(payload).then((s) => {
      if (s && s.id) {
        refQRCodeScaner.current.onClose((data) => { });
      }
    });
  };
  return (
    <>
      <Button onClick={onScanQRcode}>CLick Modal</Button>
      <ScanQrCode wrappedComponentRef={refQRCodeScaner} handleSubmit={handleSubmit} />
      {/* form create k dung form.create => chuyển wrappedComponentRef thành ref */}
    </>
  );
}

export default connect(
  (state) => {
    return {

    };
  },
  {
    createOrEdit: actionUnit.createOrEdit,
  }
)(index);
