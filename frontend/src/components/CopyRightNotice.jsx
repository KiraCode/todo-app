import React from "react";

const defaultNoticeText = "© 2025 WSA. All rights reserved";
const CopyRightNotice = ({ noticeText = defaultNoticeText }) => {
  return <p className="getting-started-copyright-text">{noticeText}</p>;
};

export default CopyRightNotice;
