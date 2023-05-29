import "./styles/loading.css";
const Loading = () => {
  return (
    <div className="loadign">
      <div className="cloud">
        <span className="shadow"></span>
      </div>

      <div className="loaders">
        <div className="loadign_1"></div>
        <div className="loadign_2"></div>
        <div className="loadign_3"></div>
      </div>
      <div className="footer">
        <h2>Por favor, activar su ubicación para ejecutar la aplicación</h2>
      </div>
    </div>
  );
};

export default Loading;
