import { styled } from 'styled-components';

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;

  .user-info-title {
    font-size: 21px;
    color: #232629;
    font-weight: 400;
  }

  .posts-container {
    flex-grow: 1;
    margin: 0 0 0 2rem;
  }

  .post-link {
    display: block;
    width: 100%;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d9dc;
  border-radius: 5px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  text-align: center;
  .data {
    font-size: 17px;
    color: #0c0d0e;
  }

  .type {
    font-size: 13px;
    color: #6a737c;
  }
`;

export const PostListContainer = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d9dc;
  border-bottom: 0;
  border-radius: 5px;
  margin: 1rem 0;
`;

export const PostItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d6d9dc;
  padding: 1rem;
  align-items: center;

  .title {
    color: #0074cc;
    font-size: 13px;
  }

  .date {
    color: #6a737c;
    font-size: 11px;
  }
`;

export const NoPostsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d9dc;
  border-radius: 5px;
  padding: 0rem 14.5rem;
  background-color: #f8f9f9;
  justify-content: center;
  align-items: center;

  img {
    margin: 0.5rem;
  }

  p {
    font-size: 13px;
    color: #6a737c;
    margin: 0.3rem;
    text-align: center;
  }
`;
