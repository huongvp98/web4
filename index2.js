import React, { useRef } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import actionUnit from "@actions/unit";
import ScanQrCode from "./modal-create-form-with-ref/index2";
import { useHistory } from "react-router";
function index(props) {
  const refQRCodeScaner = useRef(null);
  const history = useHistory()
  const onScanQRcode = () => {
    if (refQRCodeScaner.current) {
      //callback
      refQRCodeScaner.current.show((data) => {
        history.push("/app/vital-signs/" + data);
      });
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
      {/* https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140 */}
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
