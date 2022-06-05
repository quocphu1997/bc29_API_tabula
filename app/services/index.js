function Service() {
  this.arr = [];
  this.getListAPI = function () {
    return axios({
      url: "https://628e534c368687f3e714f327.mockapi.io/api/ListTeacher",
      method: "GET",
    });
  };
  this.deleteListAPI = function (id) {
    return axios({
      url: `https://628e534c368687f3e714f327.mockapi.io/api/ListTeacher/${id}`,
      method: "DELETE",
    });
  };
  this.editListAPI = function (id) {
    return axios({
      url: `https://628e534c368687f3e714f327.mockapi.io/api/ListTeacher/${id}`,
      method: "GET",
    });
  };
  this.updateListAPI = function (listPeo) {
    return axios({
      url: `https://628e534c368687f3e714f327.mockapi.io/api/ListTeacher/${listPeo.id}`,
      method: "PUT",
      data: listPeo,
    });
  };
  this.addListAPI = function (listPeo) {
    return axios({
      url: "https://628e534c368687f3e714f327.mockapi.io/api/ListTeacher",
      method: "POST",
      data: listPeo,
    });
  };
}
