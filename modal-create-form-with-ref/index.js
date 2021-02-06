import { Form, Input, Modal } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function index(props, ref) {
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState({ ...state, ...data });
  };
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  useEffect(() => {
    setMa("")
    setTen("")
  })
  const show = (data = {}, callback) => {
    setState({ show: true });
    refCallback.current = callback;
  };
  const onClose = (data = {}, callback) => {
    setMa("");
    setTen("");
    setState({ show: false });
    refCallback.current = callback;
  };
  useImperativeHandle(ref, () => ({ show, onClose }));
  const onCancel = () => {
    setState({ show: false });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    // props.handleSubmit({ ma, ten, active: true });
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleSubmit({ ma, ten, active: true })
      }
    });
  };
  const { getFieldDecorator } = props.form
  return (
    <>
      <Modal
        visible={state.show}
        title="Basic Modal"
        onOk={handleSubmit}
        onCancel={onClose}
      >
        <div>
          <Form layout="vertical">
            <Form.Item name="owner" label="Mã đơn vị" >
              {getFieldDecorator("ma", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhâp mã đơn vị!",
                  },
                ],
                initialValue: ma,
              })(
                <Input
                  onChange={(e) => setMa(e.target.value)}
                />
              )}
            </Form.Item>
            <Form.Item name="owner" label="Tên đơn vị" >
              {getFieldDecorator("ten", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập tên đơn vị!",
                  },
                ],
                initialValue: ten,
              })(
                <Input placeholder="Nhập tên đơn vị"
                  onChange={(e) => setTen(e.target.value)}
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default Form.create()(forwardRef(index));
