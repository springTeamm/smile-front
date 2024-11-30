import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/PerformanceBoard.module.css";

const RecruitBoardPostForm = () => {
  const [recruitTitle, setRecruitTitle] = useState("");
  const [recruitCount, setRecruitCount] = useState("");
  const [requirements, setRequirements] = useState("");
  const [images, setImages] = useState([]);

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
            title: recruitTitle,
            text: `모집 인원: ${recruitCount}\n요구사항: ${requirements}`,
            categoryNum: 2,
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
      alert("모집 공고가 작성되었습니다!");
    } catch (error) {
      console.error("모집 공고 작성 실패:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>모집 공고 작성</h1>
      <div>
        <label>모집 제목</label>
        <input
          type="text"
          value={recruitTitle}
          onChange={(e) => setRecruitTitle(e.target.value)}
        />
      </div>
      <div>
        <label>모집 인원</label>
        <input
          type="number"
          value={recruitCount}
          onChange={(e) => setRecruitCount(e.target.value)}
        />
      </div>
      <div>
        <label>모집 조건</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>이미지 첨부 (최대 5개)</label>
        <input type="file" multiple onChange={handleImageChange} />
      </div>
      <button type="submit">작성하기</button>
    </form>
  );
};

export default RecruitBoardPostForm;
