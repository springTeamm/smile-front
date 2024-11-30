import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/PerformanceDetails.module.css";

const RecruitDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/community/${id}`);
        setPost(response.data);
        if (response.data.photos && response.data.photos.length > 0) {
          setMainImage(response.data.photos[0].cJpgPath);
        }
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const extractRecruitInfo = (text) => {
    const [recruitCount, requirements] = text.split("\n요구사항:");
    return {
      recruitCount: recruitCount.replace("모집 인원:", "").trim(),
      requirements: requirements?.trim() || "",
    };
  };

  const recruitInfo = extractRecruitInfo(post.text);

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <h1>{post.title}</h1>
        {mainImage && <img src={`http://localhost:5000/${mainImage}`} alt="Main" />}
        <div className={styles.images}>
          {post.photos &&
            post.photos.map((photo) => (
              <img
                key={photo.cJpgNum}
                src={`http://localhost:5000/${photo.cJpgPath}`}
                alt={photo.cJpgOriginName}
                onClick={() => setMainImage(photo.cJpgPath)}
              />
            ))}
        </div>
        <p>
          <strong>모집 인원:</strong> {recruitInfo.recruitCount}
        </p>
        <p>
          <strong>요구 사항:</strong> {recruitInfo.requirements}
        </p>
      </main>
    </div>
  );
};

export default RecruitDetails;
