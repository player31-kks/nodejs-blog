/* eslint-disable no-undef */
const updatedBtn = document.querySelector("#updatedBtn");
const title = document.querySelector("#title");
const user = document.querySelector("#user");
const password = document.querySelector("#password");
const content = document.querySelector("#content");

updatedBtn.addEventListener("click", () => {
  if (!isRequired()) {
    alert("모든 항목을 채워주세요!!");
    return;
  }
  const id = updatedBtn.dataset.id;
  console.log(id);
  axios
    .put(`/post/${id}`, {
      title: title.value,
      user: user.value,
      password: password.value,
      content: content.value,
    })
    .then(() => {
      console.log("success");
      location.replace("/post");
    })
    .catch((error) => {
      console.log(error);
    });
});

function isRequired() {
  if (!title.value || title.value === "") {
    return false;
  }
  if (!user.value || user.value === "") {
    return false;
  }
  if (!password.value || password.value === "") {
    return false;
  }
  if (!content.value || content.value === "") {
    return false;
  }
  return true;
}
