import { Link } from 'react-router-dom';
import { UserInfoContainer, StatsContainer, PostListContainer, PostItemContainer, NoPostsContainer } from './UserInfo.styled';
import PostsListImg from '../../common/image/PostsList.png';

export default function UserInfo({
  userData,
}) {
  return (
    <UserInfoContainer>
      <div className='stats-container'>
        <div className='user-info-title'>
          Stats
        </div>
        <StatsContainer>
          <span className='data'>
            {userData.list.length}
          </span>
          <span className='type'>questions</span>
        </StatsContainer>
      </div>
      <div className='posts-container'>
        <div className='user-info-title'>Posts</div>
        {userData.list.length ?
          <PostListContainer>
            {userData.list.slice(0, 10).map(el => (
              <Link
                to={`/questions/${el.questionId}`}
                key={el.questionId}
                className='post-link'
              >
                <PostItemContainer>
                  <div className='title'>{el.title}</div>
                  <div className='date'>{el.createdAt.slice(0, 10)}</div>
                </PostItemContainer>
              </Link>
            ))}
          </PostListContainer> :
          <NoPostsContainer>
            <img src={PostsListImg} alt="" />
            <p>Just getting started? Try answering a question!</p>
            <p>Your most helpful questions, answers and tags will appear here. Start by answering a question or selecting tags that match topics you&apos;re interested in.</p>
          </NoPostsContainer>
        }
      </div>
    </UserInfoContainer>
  );
}