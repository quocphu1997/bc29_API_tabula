function Validation() {
  // check nhập rỗng tk
  this.ktraRong = function (value, errorID, message) {
    if (value === "") {
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
    // có nhập liệu
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };

  //kiemtra ten
  this.ktraKysoTen = function (value, errorID, message) {
    var kyso =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(kyso)) {
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    } else {
      // false
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
  };
  //   kiem tra chon ND
  this.ktraND = function (selectID, errorID, message) {
    //   check chọn ND
    if (getEle(selectID).selectedIndex !== 0) {
      // vị trí 0
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    // false
    getEle(errorID).innerHTML = message;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra mật khẩu
  this.ktraMatkhau = function (value, errorID, message) {
    var letterMK =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/g;
    if (value.match(letterMK)) {
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    } else {
      // false
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
  };
  // kiểm tra ký tự email
  this.ktrakytuEmail = function (value, errorID, message) {
    var kyTuEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if (value.match(kyTuEmail)) {
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    } else {
      // false
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
  };
  //   kiểm tra mo ta trong khoảng
  this.ktramoTa = function (value, errorID, message, min, max) {
    if (value.trim().length >= min || value.trim().lenght <= max) {
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    } else {
      // false
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
  };

  //   kiểm tra tài khoản tồn tại
  this.ktraTaiKhoanTonTai = function (value, errorID, message, array) {
    var isStatus = true; // biến cờ hiệu
    array.forEach(function (index, i) {
      if (index.taiKhoan === value) {
        //   trùng tài khoản
        isStatus = false;
      }
    });
    if (isStatus) {
      // true
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    } else {
      // false
      getEle(errorID).innerHTML = message;
      getEle(errorID).style.display = "block";
      return false;
    }
  };
}
