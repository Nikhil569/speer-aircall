import { loadingIcon } from "../../assets";
import "../../css/Loading.css";

const Loading = () => {
  return (
    <div className="loading-icon">
      <img src={loadingIcon} />
    </div>
  );
};

export default Loading;
