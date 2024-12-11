import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import styles from "../../styles/PerformanceBoard.module.css";
import { useNavigate } from "react-router-dom";

const RecruitBoardPostForm = () => {
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [links, setLinks] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "community",
      new Blob(
        [
          JSON.stringify({
            title,
            text,
            members,
            links,
            categoryNum: 2,
            date: new Date().toISOString(),
          }),
        ],
        { type: "application/json" }
      )
    );

    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post("http://localhost:5000/community", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("모집 공고 글이 작성되었습니다!");
      navigate("/board-recruit");
    } catch (error) {
      console.error("글 작성 실패:", error);
      alert("글 작성에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className={styles.profileImage}
          />
          <p className={styles.username}>이재혁</p>
        </div>
        <nav className={styles.nav}>
          <ul>

            <li>
              <Link to="/board-performance">공연 홍보</Link>
            </li>
            <li className={styles.active}>
              <Link to="/board-recruit">모집 공고</Link>
            </li>
            <li>
              
              <Link to="/board-promotion">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>모집 공고 글 작성</h1>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>멤버</label>
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="멤버를 쉼표로 구분하여 입력하세요"
          />
        </div>
        <div>
          <label>그룹 링크</label>
          <input
            type="url"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder="http://example.com"
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>이미지 첨부</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default RecruitBoardPostForm;
