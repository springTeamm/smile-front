import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import styles from "../../styles/PerformanceBoard.module.css";
import { useNavigate } from "react-router-dom";

const PromotionBoardPostForm = () => {
  const [title, setTitle] = useState(""); 
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
            links,
            categoryNum: 3,
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
      alert("장소 홍보 글이 작성되었습니다!");
      navigate("/board-promotion");
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

            <li className={styles.active}>
              <Link to="/board-performance">공연 홍보</Link>
            </li>
            <li>
              <Link to="/board-recruit">모집 공고</Link>
            </li>
            <li>
              <Link to="/board-promotion">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>장소 홍보 글 작성</h1>
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
          <label>링크</label>
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

export default PromotionBoardPostForm;
