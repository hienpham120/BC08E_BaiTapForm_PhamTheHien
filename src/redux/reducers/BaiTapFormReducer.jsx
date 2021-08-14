const stateDefault = {
  mangSinhVien: [
    {
      maSV: "1833441",
      hoTen: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      soDienThoai: "0909090909",
    },
    {
      hoTen: "Nguyễn Văn B",
      maSV: "1733452",
      email: "nguyenvanb@gmail.com",
      soDienThoai: "0808080808",
    },
  ],

  sinhVienChinhSua: {
    hoTen: "Nguyễn Văn A",
    maSV: "1833441",
    email: "nguyenvana@gmail.com",
    soDienThoai: "0909090909",
  },

  tuKhoaTimKiem: "",
  sinhVienTimKiem: [],
};

export const BaiTapFormReducer = (state = stateDefault, action) => {
  console.log("action", action);
  switch (action.type) {
    case "THEM_SINH_VIEN":
      {
        state.mangSinhVien = [...state.mangSinhVien, action.sinhVien];
        return { ...state };
      }
      break;

    case "XOA_SINH_VIEN": {
      const mangSinhVienCapNhat = [...state.mangSinhVien];

      state.mangSinhVien = mangSinhVienCapNhat.filter(
        (sinhVien) => sinhVien.maSV !== action.maSV
      );
      return { ...state };
    }

    case "CHINH_SUA":
      {
        state.sinhVienChinhSua = action.sinhVienChinhSua;
        return { ...state };
      }
      break;

    case "HANDLE_CHANGE_INPUT":
      {
        state.sinhVien = action.sinhVien;
        return { ...state };
      }
      break;
    case "CAP_NHAT_SINH_VIEN":
      {
        const mangSinhVienCapNhat = [...state.mangSinhVien];
        //Tìm sinh viên cần cập nhật
        let index = mangSinhVienCapNhat.findIndex(
          (sinhVien) => sinhVien.maSV === action.sinhVienCapNhat.maSV
        );
        if (index != -1) {
          mangSinhVienCapNhat[index] = action.sinhVienCapNhat;
        }
        state.mangSinhVien = mangSinhVienCapNhat;
        return { ...state };
      }
      break;
    case "TU_KHOA_TIM_KIEM":
      {
        state.tuKhoaTimKiem = action.tuKhoaTimKiem;
        return { ...state };
      }
      break;
    case "TIM_KIEM_SINH)_VIEN": {
      let tuKhoa = action.tuKhoaTimKiem;
      if (tuKhoa.trim()) {
        let sinhVienTimKiem = state.mangSinhVien;
        sinhVienTimKiem = sinhVienTimKiem.filter(
          (sinhVien) =>
            sinhVien.maSV.inclues(tuKhoa) ||
            sinhVien.hoten.inclues(tuKhoa) ||
            sinhVien.soDienThoai.inclues(tuKhoa) ||
            sinhVien.email.inclues(tuKhoa)
        );
        state.sinhVienTimKiem = sinhVienTimKiem;
      } else {
        state.sinhVienTimKiem = state.mangSinhVien;
      }
      return { ...state };
    }

    default:
      return state;
  }
};
