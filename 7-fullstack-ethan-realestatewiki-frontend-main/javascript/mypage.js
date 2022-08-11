import { makeNav } from "../middlewares/nav-maker.js";
document.addEventListener("DOMContentLoaded", makeNav);

import { makeFooter } from "../middlewares/footer-maker.js";
document.addEventListener("DOMContentLoaded", makeFooter);

import { cookieDoor } from "../middlewares/cookie-door.js";

import { identifyProtocol } from "../middlewares/identifyProtocol.js";
const baseUrl = identifyProtocol();
const urlBackend = baseUrl["urlBackend"];
const urlFrontend = baseUrl["urlFrontend"];

const URL_LOGOUT = `${urlBackend}/users/logout`;
const URL_LOGIN = `${urlFrontend}/login`;
const URL_HOME = `${urlFrontend}`;
const URL_GET_MY_POST_COUNT = `${urlBackend}/posts/user-post/count`;
const URL_GET_MY_POST_COMMENT = `${urlBackend}/comments/getbyuserIndex/post-comment`;
const URL_GET_MY_APT_COMMENT = `${urlBackend}/comments/getbyuserIndex/apt-comment`;
const URL_GET_POST = `${urlFrontend}/post/`;
const URL_GET_APT_INFO = `${urlFrontend}/info/`;

// 로그인 되어 있지 않을 때, 홈화면으로 돌아가기
cookieDoor();

document.addEventListener("DOMContentLoaded", getMyPost);
document.addEventListener("DOMContentLoaded", getMyPostComment);
document.addEventListener("DOMContentLoaded", getMyAptComment);

async function getMyPost() {
  const myPostList = document.querySelector(".myposts__items");
  const response = await fetch(
    `${URL_GET_MY_POST_COUNT}`,
    // userId=${encodeURIComponent(userId)}
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (response["status"] == 404) {
    const totalPostCount = document.querySelector(".myposts__info > span > b");
    totalPostCount.textContent = 0;
    return;
  }
  const data = await response.json();
  const totalPostCount = document.querySelector(".myposts__info > span > b");
  totalPostCount.textContent = `${data.length}`;
  for (let i = 0; i < data.length; i++) {
    const item = document.createElement("li");
    const postTitle = document.createElement("a");
    postTitle.className = "myposts__title";
    postTitle.textContent = data[i]["title"];
    postTitle.setAttribute("href", `${URL_GET_POST}${data[i]["id"]}`);
    const postInfo = document.createElement("div");
    postInfo.className = "myposts__sub-detail";
    const dateIcon = document.createElement("i");
    dateIcon.className = "fa-regular fa-calendar-days";
    const postInfoDate = document.createElement("span");
    postInfoDate.textContent = data[i]["datetime_created"];
    const viewsIcon = document.createElement("i");
    viewsIcon.className = "fa-regular fa-eye";
    const postInfoviews = document.createElement("span");
    postInfoviews.textContent = data[i]["views"];
    const commentsIcon = document.createElement("i");
    commentsIcon.className = "fa-regular fa-comment-dots";
    const postInfocomments = document.createElement("span");
    postInfocomments.textContent = data[i]["comments_enabled"];
    const recommendsIcon = document.createElement("i");
    recommendsIcon.className = "fa-solid fa-thumbs-up";
    const postInforecommends = document.createElement("span");
    postInforecommends.textContent = data[i]["recommended_number"];
    myPostList.append(item);
    item.append(postTitle);
    item.append(postInfo);
    postInfo.append(dateIcon);
    postInfo.append(postInfoDate);
    postInfo.append(viewsIcon);
    postInfo.append(postInfoviews);
    postInfo.append(commentsIcon);
    postInfo.append(postInfocomments);
    postInfo.append(recommendsIcon);
    postInfo.append(postInforecommends);
  }
}

// 작성한 댓글 보기

async function getMyPostComment() {
  const myPostCommentList = document.querySelector(".myPostcomments__items");
  const response = await fetch(`${URL_GET_MY_POST_COMMENT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response["status"] == 404) {
    const totalPostCount = document.querySelector(
      ".myPostcomments__info > span > b"
    );
    totalPostCount.textContent = 0;
    return;
  }
  const data = await response.json();
  const totalPostCount = document.querySelector(
    ".myPostcomments__info > span > b"
  );
  totalPostCount.textContent = `${data.length}`;

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement("li");
    const postCommentTitle = document.createElement("a");
    postCommentTitle.className = "myPostcomments__title";
    postCommentTitle.textContent = data[i]["content"];
    postCommentTitle.setAttribute(
      "href",
      `${URL_GET_POST}${data[i]["post_id"]}`
    );
    const postCommentInfo = document.createElement("div");
    postCommentInfo.className = "myPostcomments__sub-detail";
    const postCommentdateIcon = document.createElement("i");
    postCommentdateIcon.className = "fa-regular fa-calendar-days";
    const postCommentInfoDate = document.createElement("span");
    postCommentInfoDate.textContent = data[i]["datetime_updated"];
    myPostCommentList.append(item);
    item.append(postCommentTitle);
    item.append(postCommentInfo);
    postCommentInfo.append(postCommentdateIcon);
    postCommentInfo.append(postCommentInfoDate);
  }
}

async function getMyAptComment() {
  const myPostCommentList = document.querySelector(".myAptcomments__items");
  const response = await fetch(`${URL_GET_MY_APT_COMMENT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response["status"] == 404) {
    const totalPostCount = document.querySelector(
      ".myAptcomments__info > span > b"
    );
    totalPostCount.textContent = 0;
    return;
  }
  const data = await response.json();
  const totalPostCount = document.querySelector(
    ".myAptcomments__info > span > b"
  );
  totalPostCount.textContent = `${data.length}`;

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement("li");
    const postCommentTitle = document.createElement("a");
    postCommentTitle.className = "myAptcomments__title";
    postCommentTitle.textContent = data[i]["content"];
    postCommentTitle.setAttribute(
      "href",
      `${URL_GET_APT_INFO}${data[i]["apt_id"]}`
    );
    const postCommentInfo = document.createElement("div");
    postCommentInfo.className = "myPostcomments__sub-detail";
    const postCommentdateIcon = document.createElement("i");
    postCommentdateIcon.className = "fa-regular fa-calendar-days";
    const postCommentInfoDate = document.createElement("span");
    postCommentInfoDate.textContent = data[i]["datetime_updated"];
    const postCommentAptIcon = document.createElement("i");
    postCommentAptIcon.className = "fa-solid fa-building";
    const postCommentInfoAptName = document.createElement("span");
    postCommentInfoAptName.textContent = data[i]["name"];

    myPostCommentList.append(item);
    item.append(postCommentTitle);
    item.append(postCommentInfo);
    postCommentInfo.append(postCommentdateIcon);
    postCommentInfo.append(postCommentInfoDate);
    postCommentInfo.append(postCommentAptIcon);
    postCommentInfo.append(postCommentInfoAptName);
  }
}
