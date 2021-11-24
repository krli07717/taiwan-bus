import backSvg from "../assets/icon-back.svg";
function BackButton() {
  return (
    <img
      src={backSvg}
      alt="back icon"
      className="back_page"
      onClick={() => {
        window.history.go(-1);
      }}
    />
  );
}

export default BackButton;
