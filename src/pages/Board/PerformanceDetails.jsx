import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/PerformanceDetails.module.css";

const PerformanceDetails = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("URL에서 추출된 id 값:", id);

    if (!id) {
      setError("잘못된 요청: id가 정의되지 않았습니다.");
      return;
    }

  
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/community/${id}`);
        console.log("받아온 데이터:", response.data);
        setPost(response.data);
      } catch (err) {
        console.error("게시글 데이터를 가져오는 데 실패했습니다:", err.message);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/community/${id}/images`);
        console.log("받아온 이미지 데이터:", response.data);
        setImages(response.data); 
      } catch (err) {
        console.error("이미지 데이터를 가져오는 데 실패했습니다:", err.message);
      }
    };

    fetchPostDetails();
    fetchImages();
  }, [id]);

  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>{post.title || "제목 없음"}</h1>
          <p>
            작성자: {post.userNum || "익명"} | 게시 날짜: {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.details}>
          <h2>내용</h2>
          <p>{post.text}</p>
        </div>
        <div className={styles.details}>
          <h2>일정</h2>
          <p>{post.schedule ? new Date(post.schedule).toLocaleString() : "없음"}</p>
        </div>
        <div className={styles.details}>
          <h2>위치</h2>
          <p>{post.location || "위치 정보 없음"}</p>
        </div>
        <div className={styles.details}>
          <h2>멤버</h2>
          <p>{post.members || "멤버 정보 없음"}</p>
        </div>
        <div className={styles.details}>
          <h2>그룹 링크</h2>
          <a href={post.links || "#"} target="_blank" rel="noopener noreferrer">
            {post.links || "링크 없음"}
          </a>
        </div>
        <div className={styles.details}>
  <h2>이미지</h2>
  <div className={styles.imageContainer}>
    {images.length > 0 ? (
      images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:5000${image.cJpgPath}`} 
          alt={image.cJpgOriginName || `image-${index}`}
          className={styles.image}
        />

              ))
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default PerformanceDetails;
