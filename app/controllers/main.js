var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}
// Tạo 1 list API
function getList() {
  service
    .getListAPI()
    .then(function (result) {
      // xuat list ra
      renderList(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getList();

// lay du lieu API ve vaf xuat ra dang bang
function renderList(data) {
  var content = "";
  data.forEach(function (listAPI, i) {
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${listAPI.taiKhoan}</td>
            <td>${listAPI.matKhau}</td>
            <td>${listAPI.hoTen}</td>
            <td>${listAPI.email}</td>
            <td>${listAPI.ngonNgu}</td>
            <td>${listAPI.loaiND}</td>
            <td>
                <button class = "btn btn-danger" onclick="deleteList(${
                  listAPI.id
                })">Xóa</button>
                <button class = "btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editList(${
                  listAPI.id
                })">Sửa</button>
            </td>
        </tr>
        `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// xoa API
function deleteList(id) {
  service
    .deleteListAPI(id)
    .then(function (result) {
      getList();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// edit API
function editList(id) {
  // title cap nhat
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập nhật thông tin";
  // btn cập nhật
  var btnfooter = `<button class="btn btn-success" onclick = "updateList(${id})">Update</button> `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnfooter;
  service
    .editListAPI(id)
    .then(function (result) {
      // show thong tin
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Update API
function updateList(id) {
  var Up_taiKhoan = getEle("TaiKhoan").value;
  var Up_matKhau = getEle("MatKhau").value;
  var Up_hoTen = getEle("HoTen").value;
  var Up_email = getEle("Email").value;
  var Up_ngonNgu = getEle("loaiNgonNgu").value;
  var Up_loaiND = getEle("loaiNguoiDung").value;
  var Up_hinhAnh = getEle("HinhAnh").value;
  var Up_moTa = getEle("MoTa").value;

  // đối tượng list
  var listpeo = new ListPeo(
    id,
    Up_taiKhoan,
    Up_matKhau,
    Up_hoTen,
    Up_email,
    Up_ngonNgu,
    Up_loaiND,
    Up_hinhAnh,
    Up_moTa
  );
  service
    .updateListAPI(listpeo)
    .then(function (result) {
      getList();
      // cập nhật xong tự close
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// btn them moi
getEle("btnThemNguoiDung").onclick = function () {
  // sua title modal
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người mới";
  // them btn add
  var btnfooter = `<button class="btn btn-success" onclick = "addList()">Add</button> `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnfooter;
};

function addList() {
  var Up_taiKhoan = getEle("TaiKhoan").value;
  var Up_matKhau = getEle("MatKhau").value;
  var Up_hoTen = getEle("HoTen").value;
  var Up_email = getEle("Email").value;
  var Up_ngonNgu = getEle("loaiNgonNgu").value;
  var Up_loaiND = getEle("loaiNguoiDung").value;
  var Up_hinhAnh = getEle("HinhAnh").value;
  var Up_moTa = getEle("MoTa").value;
  // đối tượng list
  var listpeo = new ListPeo(
    "",
    Up_taiKhoan,
    Up_matKhau,
    Up_hoTen,
    Up_email,
    Up_ngonNgu,
    Up_loaiND,
    Up_hinhAnh,
    Up_moTa
  );
  // validation
  var isValid = true; //tạo flag để check
  var validation = new Validation();

  // goi lai de lay API
  service
    .getListAPI()
    .then(function (result) {
      // xuat list ra
      renderList(result.data);
      isValid &=
        validation.ktraTaiKhoanTonTai(
          Up_taiKhoan,
          "tbtkhoan",
          "(*)Tài khoản tồn tại",
          result.data
        ) &&
        validation.ktraRong(
          Up_taiKhoan,
          "tbtkhoan",
          "(*)Vui lòng không để trống"
        );
      // console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  // check tai khoan
  isValid &= validation.ktraRong(
    Up_taiKhoan,
    "tbtkhoan",
    "(*)Vui lòng không để trống"
  );
  // check trung tai khoan

  //check ten
  isValid &=
    validation.ktraRong(Up_hoTen, "tbhoTen", "(*)Vui lòng không để trống") &&
    validation.ktraKysoTen(
      Up_hoTen,
      "tbhoTen",
      "(*)Vui lòng không nhập số hoặc ký tự đặc biệt"
    );
  //check mat khau
  isValid &=
    validation.ktraRong(Up_matKhau, "tbmk", "(*)Vui lòng không để trống") &&
    validation.ktraMatkhau(
      Up_matKhau,
      "tbmk",
      "(*)Vui lòng nhập (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) "
    );
  // check email
  isValid &=
    validation.ktraRong(Up_email, "tbemail", "(*)Vui lòng không để trống") &&
    validation.ktrakytuEmail(
      Up_email,
      "tbemail",
      "(*)Vui lòng nhập đúng cú pháp abc@mail.com"
    );
  // check hinh anh
  isValid &= validation.ktraRong(
    Up_hinhAnh,
    "tbhinhAnh",
    "(*)Vui lòng không để trống"
  );
  // check mo ta
  isValid &=
    validation.ktraRong(Up_moTa, "tbmoTa", "(*)Vui lòng không để trống") &&
    validation.ktramoTa(
      Up_moTa,
      "tbmoTa",
      "(*)Vui lòng không nhập hơn 60 ký tự",
      1,
      60
    );
  // check chon ND
  isValid &= validation.ktraND(
    "loaiNguoiDung",
    "tbND",
    "(*)Vui lòng chọn người dùng"
  );
  // check chon ngon ngu
  isValid &= validation.ktraND(
    "loaiNgonNgu",
    "tbngonNgu",
    "(*)Vui lòng chọn ngôn ngữ"
  );
  // if (!isValid) {
  //   return;
  // }
  if (isValid == true) {
    service
      .addListAPI(listpeo)
      .then(function (result) {
        getList();
        // cập nhật xong tự close
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
