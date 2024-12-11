import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/PerformanceBoard.module.css";

const RecruitDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/community/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("게시글 데이터를 가져오는 데 실패했습니다:", err.message);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/community/${id}/images`);
        setImages(response.data);

        if (response.data.length > 0) {
          setMainImage(`http://localhost:5000${response.data[0].cJpgPath}`);
        }
      } catch (err) {
        console.error("이미지 데이터를 가져오는 데 실패했습니다:", err.message);
      }
    };

    fetchPostDetails();
    fetchImages();
  }, [id]);

  // Handle thumbnail click
  const handleThumbnailClick = (imagePath) => {
    setMainImage(`http://localhost:5000${imagePath}`);
  };

  // If post is not loaded
  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

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
      <main className={styles.content}>
        <div className={styles.postMeta}>
          <p>
            작성자: {post.userNum || "익명"} | 게시 날짜: {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <h1 className={styles.title}>{post.title || "제목 없음"}</h1>
        {images.length > 0 ? (
          <div className={styles.imageSection}>
            <img src={mainImage} alt="Main" className={styles.mainImage} />
            <div className={styles.smallImages}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${image.cJpgPath}`}
                  alt={image.cJpgOriginName || `image-${index}`}
                  className={styles.thumbnail}
                  onClick={() => handleThumbnailClick(image.cJpgPath)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={`${styles.imageSection} ${styles.placeholderSection}`}>
            <p className={styles.placeholderText}>이미지가 없습니다.</p>
          </div>
        )}
        <div className={styles.textSection}>
          <h2>내용</h2>
          <p>
            {post.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <h2>멤버</h2>
          <p>{post.members || "멤버 정보 없음"}</p>
          <h2>그룹 링크</h2>
          <a href={post.links || "#"} target="_blank" rel="noopener noreferrer">
            {post.links || "링크 없음"}
          </a>
        </div>
      </main>
    </div>
  );
};

export default RecruitDetails;
