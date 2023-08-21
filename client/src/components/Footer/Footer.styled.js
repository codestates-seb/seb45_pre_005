import { styled } from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  height: 322px;
  background-color: #232629;
  color: hsl(210, 8%, 60%);
  font-size: 13px;
`;

export const FooterWrap = styled.div`
  width: var(--main-width);
  max-width: 1264px;
  margin: 0 auto;
  height: 100%;
  padding: 32px 12px 12px 12px;
  display: flex;
  flex-flow: row wrap;
  @media screen and (max-width: 980px) and (min-width: 640px) {
    padding: 24px;
    flex-flow: column wrap;
  }
`;

// 로고 이미지
export const FooterLogoWrap = styled.div`
  display: flex;
  flex: 0 0 64px;
  margin-top: -12px;
  margin-bottom: 32px;
  > img {
    width: 37px;
    height: 37px;
  }
  @media screen and (max-width: 640px) {
    > img {
      display: none;
    }
  }
`;

// 네비게이션
export const FooterNav = styled.nav`
  display: flex;
  flex: 2 1 auto;
  flex-wrap: wrap;
  > div {
    padding: 0px 12px 16px 0px;
    flex: 1 0 auto;
    > h5 {
      font-weight: bold;
      color: hsl(210, 8%, 75%);
      margin-bottom: 12px;
    }
    > ul {
      margin: 0;
      list-style: none;
      > li {
        color: hsl(210, 8%, 60%);
        padding: 4px 0px;
      }
    }
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;
    font-size: 11px;
    > div {
      flex-direction: column;
      flex: 1 0 auto;
      > h5 {
        margin-bottom: 8px;
      }
      > ul {
        display: flex;
        column-gap: 12px;
        row-gap: 8px;
        flex-wrap: wrap;
        // li wrap 안됨!
        > li {
          padding: 0px;
        }
      }
    }
  }
`;

// 카피라이트
export const FooterCopyright = styled.div`
  display: flex;
  flex: 1 1 150px;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 11px;

  > ul {
    display: flex;
    margin: 0;
    padding: 0;
    > li {
      color: hsl(210, 8%, 60%);
      margin: 4px 7px 4px 4px;
    }
    > li:first-child {
      margin-left: 0px;
    }
  }

  > p {
    color: hsl(210, 8%, 60%);
    margin-top: auto;
    margin-bottom: 24px;
    white-space: normal; // p는 wrap 사용 불가
  }

  // 반응형 웹 카피라이트 row 상태임. 추후 해결필요
  @media screen and (max-width: 980px) {
    margin-top: 24px !important;
    > ul {
      margin-bottom: 8px !important;

      > li {
        padding: 0px;
      }
    }
    > p {
    }
  }
`;
