import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

const Post = styled.div`
  background-color: #fafafa;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Body = styled.p`
  color: #444;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line; /* Ensures proper formatting of multi-line text */
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .spinner-border {
    width: 3rem;
    height: 3rem;
    border-width: 0.4em;
    border-color: #007bff transparent transparent transparent;
  }
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      // Mock data to simulate readable posts
      const mockPosts = [
        {
          id: 1,
          title: "Understanding React Hooks",
          body: "React hooks are a feature that allows you to use state and other React features without writing a class. They make it easier to share logic between components and manage stateful logic in functional components."
        },
        {
          id: 2,
          title: "Introduction to Styled Components",
          body: "Styled-components is a library for React and React Native that allows you to use component-level styles in your application. It utilizes tagged template literals to style your components, making your code more maintainable and scalable."
        },
        {
          id: 3,
          title: "Why Use Axios for HTTP Requests?",
          body: "Axios is a popular library for making HTTP requests in JavaScript. It provides a simple API for sending HTTP requests and handling responses. It also has built-in support for promises and is often preferred for its ease of use over the native fetch API."
        },
        {
          id: 4,
          title: "Creating a Responsive Layout",
          body: "Responsive design ensures that your web application looks good on all devices, from desktop monitors to mobile phones. Techniques such as media queries, flexible grid layouts, and responsive images help in creating a responsive layout."
        },
        {
          id: 5,
          title: "The Benefits of Component-Based Architecture",
          body: "Component-based architecture breaks down a user interface into small, reusable pieces. This approach promotes reusability, maintainability, and better organization of code, leading to more scalable and manageable applications."
        },
        {
          id: 6,
          title: "Testing React Components",
          body: "Testing React components ensures that they work as expected and helps prevent bugs. Tools like Jest and React Testing Library provide a robust environment for writing and running tests for your React components."
        }
      ];

      // Simulate a network request with a delay
      setTimeout(() => {
        setPosts((prevPosts) => [...prevPosts, ...mockPosts]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id}>
          <Title>{post.title}</Title>
          <Body>{post.body}</Body>
        </Post>
      ))}
      {loading && (
        <Loader>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </Loader>
      )}
      <div ref={loaderRef} />
    </Container>
  );
};

export default Feed;