/* eslint-disable no-undef */
const deletedBtn = document.querySelector("#deletedBtn");
const commentForm = document.querySelector("#commentForm");
const commentBtn = document.querySelector("#commentBtn");
const title = document.querySelector("#title");

//comment
const userName = commentForm.querySelector("#userName");
const comment = commentForm.querySelector("#comment");

const writeCommentBtn = document.querySelector("#writeCommentBtn");
const postId = title.dataset.id;

const deleteHandeler = async () => {
  try {
    const { data } = await axios.delete(`/post/${postId}`);
    const { success, msg } = data;

    if (!success) {
      alert(msg);
      return;
    }
    location.replace("/post");
  } catch (e) {
    console.error(e);
  }
};

const writeCommentHandeler = async (event) => {
  try {
    const { data } = await axios.post(`/comment/${postId}`, {
      user: userName.value,
      content: comment.value,
    });

    const { success, msg } = data;
    if (!success) {
      alert(msg);
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

writeCommentBtn.addEventListener("click", async (event) => {
  if (!userName.value || userName.value === "") {
    return alert("빈칸을 입력해 주세요!");
  }
  if (!comment.value || comment.value === "") {
    return alert("빈칸을 입력해 주세요!");
  }
  await writeCommentHandeler(event);
  return;
});

commentBtn.addEventListener("click", () => {
  commentForm.classList.toggle("hidden");
});

deletedBtn.addEventListener("click", async () => {
  if (confirm("삭제 하시겠습니까?")) {
    await deleteHandeler();
  }
});
