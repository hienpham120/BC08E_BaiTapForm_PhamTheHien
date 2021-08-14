import React, { Component } from "react";
import FormDangKy from "./FormDangKy";
import SearchForm from "./SearchForm";
import TableSinhVien from "./TableSinhVien";
export default class BaiTapForm extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="text-center" style={{ fontWeight: 700 }}>
          Bài Tập Quản Lý Sinh Viên
        </h3>
        <FormDangKy />
        <SearchForm />
        <TableSinhVien />
      </div>
    );
  }
}
