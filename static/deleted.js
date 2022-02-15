/* eslint-disable no-undef */
const deletedBtn = document.querySelector("#deletedBtn");

deletedBtn.addEventListener("click", async () => {
  try {
    const id = deletedBtn.dataset.id;
    const { data } = await axios.delete(`/post/${id}`);
    const { success, msg } = data;

    if (!success) {
      alert(msg);
      return;
    }
    location.replace("/post");
  } catch (e) {
    console.error(e);
  }
});
