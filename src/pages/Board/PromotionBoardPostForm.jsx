import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PerformanceBoardPostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const community = {
      title,
      text,
      location,
      date,
      categoryNum: 1,
    };

    const formData = new FormData();
    formData.append("community", JSON.stringify(community));
    images.forEach((image) => formData.append("images", image));

    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/community", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("글 작성 성공!");
      navigate("/board-performance");
    } catch (error) {
      console.error("글 작성 실패:", error);
      alert("글 작성 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>공연 홍보 글 작성</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="내용"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="공연 장소"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input type="file" multiple onChange={handleImageChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "작성 중..." : "작성하기"}
      </button>
    </form>
  );
};

export default PerformanceBoardPostForm;
