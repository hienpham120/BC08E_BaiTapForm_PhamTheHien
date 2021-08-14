import React, { Component } from "react";
import { connect } from "react-redux";
class FormDangKy extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };
  // Xử lý sự kiện
  handleChangeInput = (event) => {
    let { value, name } = event.target; //name sẽ là từng trường input (maSV, sdt, email, hoTen), value là giá trị nhập vào (1)

    //Bóc tách giá trị values, errors từ state
    // let values = this.state.values;
    // let errors = this.state.errors;

    //Sao chép giá trị values thành newValues và gán newValues[name] thành value
    let newValues = { ...this.state.values };
    newValues[name] = value;

    // Custom validate
    let attrValue = "";
    let regex;

    // Regex email
    if (event.target.getAttribute("typeEmail")) {
      attrValue = event.target.getAttribute("typeEmail");
      regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    // Regex Phone Number
    if (event.target.getAttribute("typePhoneNumber")) {
      attrValue = event.target.getAttribute("typePhoneNumber");
      regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    }

    let newErrors = { ...this.state.errors };
    let messageError = "";
    if (value.trim() === "") {
      messageError = name + " không được bỏ trống!";
    }

    //Nếu là email
    if (regex) {
      if (attrValue === "email") {
        if (!regex.test(value)) {
          messageError = name + " phải đúng định dạng!";
        }
      }
    }

    //Nếu là mobilePhone
    if (regex) {
      if (attrValue === "phoneNumber") {
        if (!regex.test(value)) {
          messageError = name + " phải đúng định dạng!";
        }
      }
    }

    newErrors[name] = messageError;
    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };

  handleSubmit = (event) => {
    // let values = this.state.values;
    // let errors = this.state.errors;

    event.preventDefault();
    // console.log("state", this.state);
    let valid = true;
    //Errors phải rỗng hết
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "") {
        valid = false;
        break;
      }
    }
    //Values phải khác rỗng
    for (let key in this.state.values) {
      if (this.state.values[key] === "") {
        valid = true;
        break;
      }
    }
    if (!valid) {
      alert("Dữ liệu không hợp lệ");
      return;
    }
    const action = {
      type: "THEM_SINH_VIEN",
      sinhVien: this.state.values,
    };
    this.props.dispatch(action);
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      values: newProps.sinhVienChinhSua,
    });
  }

  render() {
    //Bóc tách phần tử từ mangSinhVienChinhSua đưa vào form
    let { maSV, soDienThoai, hoTen, email } = this.state.values;
    let errors = this.state.errors;

    return (
      <form className="card mt-5" onSubmit={this.handleSubmit}>
        <div
          className="card-header bg-dark text-white text-center"
          style={{ fontWeight: 500, fontSize: 25 }}
        >
          Thông Tin Sinh Viên
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Mã sinh viên</p>
                <input
                  value={maSV} //Đưa vào from sau khi bóc tách
                  className="form-control"
                  name="maSV"
                  onChange={this.handleChangeInput}
                />
              </div>
              <p className="text-danger">{errors.maSV}</p>
              <div className="form-group">
                <p>Số điện thoại</p>
                <input
                  value={soDienThoai}
                  typePhoneNumber="phoneNumber"
                  className="form-control"
                  name="soDienThoai"
                  onChange={this.handleChangeInput}
                />
                <p className="text-danger">{errors.soDienThoai}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Họ tên</p>
                <input
                  value={hoTen}
                  className="form-control"
                  name="hoTen"
                  onChange={this.handleChangeInput}
                />
                <p className="text-danger">{errors.hoTen}</p>
              </div>
              <div className="form-group">
                <p>Email</p>
                <input
                  value={email}
                  typeEmail="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChangeInput}
                />
                <p className="text-danger">{errors.email}</p>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-success">Thêm sinh viên</button>
          <button
            className="btn btn-outline-primary ml-2"
            onClick={() => {
              const action = {
                type: "CAP_NHAT_SINH_VIEN",
                sinhVienCapNhat: this.props.values,
              };
            }}
          >
            Cập nhật
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sinhVienChinhSua: state.BaiTapFormReducer.sinhVienChinhSua,
    mangSinhVien: state.BaiTapFormReducer.mangSinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
