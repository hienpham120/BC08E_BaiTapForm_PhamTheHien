import React, { Component } from "react";
import { connect } from "react-redux";

class TableSinhVien extends Component {
  renderTableSinhVien = (mangSinhVien) => {
    return mangSinhVien.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{sinhVien.maSV}</td>
          <td>{sinhVien.hoTen}</td>
          <td>{sinhVien.soDienThoai}</td>
          <td>{sinhVien.email}</td>
          <td>
            <button
              className="btn btn-danger mr-2"
              onClick={() => {
                const action = {
                  type: "XOA_SINH_VIEN",
                  maSV: sinhVien.maSV,
                };
                this.props.dispatch(action);
              }}
            >
              Xoá
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                const action = {
                  type: "CHINH_SUA",
                  sinhVienChinhSua: sinhVien,
                };
                this.props.dispatch(action);
              }}
            >
              Chỉnh sửa
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    let { mangSinhVien, sinhVienTimKiem } = this.props;
    console.log("studentList", mangSinhVien);
    console.log("searchedStudentList", sinhVienTimKiem);

    return (
      <div className="card mt-5">
        <div
          className="card-header bg-dark text-white text-center"
          style={{ fontWeight: 500, fontSize: 25 }}
        >
          Danh sách sinh viên
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {sinhVienTimKiem.length > 0
              ? this.renderTableSinhVien(sinhVienTimKiem)
              : this.renderTableSinhVien(mangSinhVien)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mangSinhVien: state.BaiTapFormReducer.mangSinhVien,
  sinhVienTimKiem: state.BaiTapFormReducer.sinhVienTimKiem,
});

export default connect(mapStateToProps)(TableSinhVien);
