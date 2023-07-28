import { css } from 'lit'

export const pageStyles = css`
  .header {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }
  .content {
    max-height: 360px;
    overflow: auto;
    width: 100%;
    margin-bottom: 0px;
    position: relative;
    padding-bottom: 10px;
    -webkit-mask-image: linear-gradient(180deg, black 90%, transparent 100%);
    mask-image: linear-gradient(180deg, black 90%, transparent 95%);
  }
`
